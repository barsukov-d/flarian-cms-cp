import { afterAll, describe, expect, it } from 'vitest';
import { HttpApp } from '@effect/platform';
import { DbTest } from '../db/client.js';
import { router } from '../router.js';

const { handler, dispose } = HttpApp.toWebHandlerLayer(router, DbTest);
afterAll(() => dispose());

const request = (path: string, init?: RequestInit) => handler(new Request(`http://localhost${path}`, init));

describe('posts router', () => {
	it('GET /api/posts returns the seeded posts in the mock-compatible shape', async () => {
		const response = await request('/api/posts');
		expect(response.status).toBe(200);

		const body = await response.json();
		expect(Array.isArray(body)).toBe(true);
		expect(body.length).toBeGreaterThanOrEqual(2);

		const post = body[0];
		expect(post).toMatchObject({
			id: expect.any(Number),
			title: expect.any(String),
			description: expect.any(String),
			content: expect.any(String),
			image: expect.any(String),
			categoryId: expect.any(Number),
			tagIds: expect.any(Array),
			publicationStatus: expect.any(String),
			author: expect.any(String),
			metaTags: expect.any(String),
			createdAt: expect.any(String),
		});
		expect(post.category).toBeTruthy();
		expect(Array.isArray(post.tags)).toBe(true);
	});

	it('GET /api/posts/:id for an id that never existed returns a 404 JSON error', async () => {
		const response = await request('/api/posts/999999');
		expect(response.status).toBe(404);
		const body = await response.json();
		expect(body.message).toBeDefined();
	});

	it('supports the full create -> get -> patch -> delete lifecycle', async () => {
		const createDto = {
			title: 'Test post',
			description: 'desc',
			content: '<p>content</p>',
			image: 'test.jpg',
			categoryId: 1,
			tagIds: [1],
			publicationStatus: 'draft',
			author: 'Tester',
			metaTags: 'test',
		};

		const createResponse = await request('/api/posts', {
			method: 'POST',
			body: JSON.stringify(createDto),
			headers: { 'Content-Type': 'application/json' },
		});
		expect(createResponse.status).toBe(201);
		const created = await createResponse.json();
		expect(created.title).toBe('Test post');
		expect(created.category?.id).toBe(1);
		expect(created.tags).toHaveLength(1);

		const getResponse = await request(`/api/posts/${created.id}`);
		expect(getResponse.status).toBe(200);
		expect((await getResponse.json()).title).toBe('Test post');

		const listBody = await (await request('/api/posts')).json();
		expect(listBody.some((p: { id: number }) => p.id === created.id)).toBe(true);

		const patchResponse = await request(`/api/posts/${created.id}`, {
			method: 'PATCH',
			body: JSON.stringify({ title: 'Updated title' }),
			headers: { 'Content-Type': 'application/json' },
		});
		expect(patchResponse.status).toBe(200);
		const patched = await patchResponse.json();
		expect(patched.title).toBe('Updated title');
		expect(patched.description).toBe('desc');

		const deleteResponse = await request(`/api/posts/${created.id}`, { method: 'DELETE' });
		expect(deleteResponse.status).toBe(200);

		const afterDeleteResponse = await request(`/api/posts/${created.id}`);
		expect(afterDeleteResponse.status).toBe(404);

		const finalList = await (await request('/api/posts')).json();
		expect(finalList.some((p: { id: number }) => p.id === created.id)).toBe(false);
	});
});
