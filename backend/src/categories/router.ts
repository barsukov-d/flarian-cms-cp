import { Effect } from 'effect';
import { HttpRouter, HttpServerResponse } from '@effect/platform';
import { Db } from '../db/client.js';
import { categories } from '../db/schema.js';

export const categoriesRouter = HttpRouter.empty.pipe(
	HttpRouter.get(
		'/categories',
		Effect.gen(function* () {
			const db = yield* Db;
			return yield* HttpServerResponse.json(db.select().from(categories).all());
		}),
	),
);
