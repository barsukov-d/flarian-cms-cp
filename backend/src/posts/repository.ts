import { eq, inArray } from 'drizzle-orm';
import type { DrizzleDb } from '../db/client.js';
import { categories, posts, postTags, tags } from '../db/schema.js';

export type CreatePostInput = {
	title: string;
	description: string;
	content: string;
	image: string;
	categoryId: number;
	tagIds: number[];
	publicationStatus: string;
	author: string;
	metaTags: string;
};

export type UpdatePostInput = Partial<CreatePostInput>;

type PostRow = typeof posts.$inferSelect;

const serialize = (db: DrizzleDb, post: PostRow) => {
	const category = db.select().from(categories).where(eq(categories.id, post.categoryId)).get() ?? null;
	const links = db.select().from(postTags).where(eq(postTags.postId, post.id)).all();
	const tagIds = links.map((link) => link.tagId);
	const postTagRecords = tagIds.length > 0 ? db.select().from(tags).where(inArray(tags.id, tagIds)).all() : [];
	return { ...post, tagIds, category, tags: postTagRecords };
};

export const listPosts = (db: DrizzleDb) =>
	db
		.select()
		.from(posts)
		.all()
		.map((post) => serialize(db, post));

export const getPost = (db: DrizzleDb, id: number) => {
	const post = db.select().from(posts).where(eq(posts.id, id)).get();
	return post ? serialize(db, post) : undefined;
};

export const createPost = (db: DrizzleDb, dto: CreatePostInput) => {
	const { tagIds, ...rest } = dto;
	const created = db
		.insert(posts)
		.values({ ...rest, createdAt: new Date().toISOString() })
		.returning()
		.get();
	for (const tagId of tagIds) {
		db.insert(postTags).values({ postId: created.id, tagId }).run();
	}
	return serialize(db, created);
};

export const updatePost = (db: DrizzleDb, id: number, dto: UpdatePostInput) => {
	const existing = db.select().from(posts).where(eq(posts.id, id)).get();
	if (!existing) return undefined;

	const { tagIds, ...rest } = dto;
	if (Object.keys(rest).length > 0) {
		db.update(posts).set(rest).where(eq(posts.id, id)).run();
	}
	if (tagIds !== undefined) {
		db.delete(postTags).where(eq(postTags.postId, id)).run();
		for (const tagId of tagIds) {
			db.insert(postTags).values({ postId: id, tagId }).run();
		}
	}

	const updated = db.select().from(posts).where(eq(posts.id, id)).get() as PostRow;
	return serialize(db, updated);
};

export const removePost = (db: DrizzleDb, id: number): boolean => {
	const result = db.delete(posts).where(eq(posts.id, id)).run();
	return result.changes > 0;
};
