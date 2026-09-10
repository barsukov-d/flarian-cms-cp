import { fileURLToPath } from 'node:url';
import path from 'node:path';
import Database from 'better-sqlite3';
import { drizzle, type BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { Context, Effect, Layer } from 'effect';
import * as schema from './schema.js';
import { seedCategories, seedPosts, seedTags } from './seedData.js';

export type DrizzleDb = BetterSQLite3Database<typeof schema>;

export class Db extends Context.Tag('Db')<Db, DrizzleDb>() {}

const migrationsFolder = path.resolve(
	path.dirname(fileURLToPath(import.meta.url)),
	'..',
	'..',
	'drizzle',
);

const seed = (db: DrizzleDb): void => {
	const existing = db.select().from(schema.categories).all();
	if (existing.length > 0) return;

	for (const category of seedCategories) db.insert(schema.categories).values(category).run();
	for (const tag of seedTags) db.insert(schema.tags).values(tag).run();
	for (const post of seedPosts) {
		const { tagIds, ...rest } = post;
		db.insert(schema.posts).values(rest).run();
		for (const tagId of tagIds) {
			db.insert(schema.postTags).values({ postId: post.id, tagId }).run();
		}
	}
};

export const makeDb = (databaseFile: string): DrizzleDb => {
	const sqlite = new Database(databaseFile);
	sqlite.pragma('journal_mode = WAL');
	sqlite.pragma('foreign_keys = ON');
	const db = drizzle(sqlite, { schema });
	migrate(db, { migrationsFolder });
	seed(db);
	return db;
};

export const DbLive = Layer.sync(Db, () => makeDb(process.env.DATABASE_URL ?? './data/db.sqlite'));

export const DbTest = Layer.sync(Db, () => makeDb(':memory:'));
