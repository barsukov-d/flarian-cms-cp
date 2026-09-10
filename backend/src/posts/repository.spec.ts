import { describe, expect, it } from 'vitest';
import { makeDb } from '../db/client.js';
import * as repository from './repository.js';

const createDto: repository.CreatePostInput = {
	title: 'Repository test post',
	description: 'desc',
	content: '<p>content</p>',
	image: 'test.jpg',
	categoryId: 1,
	tagIds: [1, 3],
	publicationStatus: 'draft',
	author: 'Tester',
	metaTags: 'test',
};

describe('posts repository', () => {
	it('lists the seeded posts with joined category and tags', () => {
		const db = makeDb(':memory:');
		const list = repository.listPosts(db);
		expect(list).toHaveLength(2);
		expect(list[0]?.category?.name).toBe('News');
		expect(list[0]?.tags.map((tag) => tag.name)).toEqual(['vue', 'quasar']);
	});

	it('creates a post and makes it retrievable with joined data', () => {
		const db = makeDb(':memory:');
		const created = repository.createPost(db, createDto);
		expect(created.title).toBe('Repository test post');
		expect(created.category?.name).toBe('News');
		expect(created.tags.map((tag) => tag.name)).toEqual(['vue', 'typescript']);

		const fetched = repository.getPost(db, created.id);
		expect(fetched?.title).toBe('Repository test post');
	});

	it('returns undefined when getting a post that does not exist', () => {
		const db = makeDb(':memory:');
		expect(repository.getPost(db, 999999)).toBeUndefined();
	});

	it('updates only the provided fields, including replacing tagIds', () => {
		const db = makeDb(':memory:');
		const created = repository.createPost(db, createDto);

		const updated = repository.updatePost(db, created.id, {
			title: 'Updated title',
			tagIds: [2],
		});

		expect(updated?.title).toBe('Updated title');
		expect(updated?.description).toBe('desc');
		expect(updated?.tags.map((tag) => tag.name)).toEqual(['quasar']);
	});

	it('returns undefined when updating a post that does not exist', () => {
		const db = makeDb(':memory:');
		expect(repository.updatePost(db, 999999, { title: 'x' })).toBeUndefined();
	});

	it('removes a post so it is no longer retrievable', () => {
		const db = makeDb(':memory:');
		const created = repository.createPost(db, createDto);

		expect(repository.removePost(db, created.id)).toBe(true);
		expect(repository.getPost(db, created.id)).toBeUndefined();
		expect(repository.removePost(db, created.id)).toBe(false);
	});
});
