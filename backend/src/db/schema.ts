import { sqliteTable, integer, text, primaryKey } from 'drizzle-orm/sqlite-core';

export const categories = sqliteTable('categories', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	createdAt: text('created_at').notNull(),
});

export const tags = sqliteTable('tags', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	createdAt: text('created_at').notNull(),
});

export const posts = sqliteTable('posts', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	title: text('title').notNull(),
	description: text('description').notNull(),
	content: text('content').notNull(),
	image: text('image').notNull(),
	categoryId: integer('category_id')
		.notNull()
		.references(() => categories.id),
	publicationStatus: text('publication_status').notNull(),
	author: text('author').notNull(),
	metaTags: text('meta_tags').notNull(),
	createdAt: text('created_at').notNull(),
});

export const postTags = sqliteTable(
	'post_tags',
	{
		postId: integer('post_id')
			.notNull()
			.references(() => posts.id, { onDelete: 'cascade' }),
		tagId: integer('tag_id')
			.notNull()
			.references(() => tags.id, { onDelete: 'cascade' }),
	},
	(table) => [primaryKey({ columns: [table.postId, table.tagId] })],
);
