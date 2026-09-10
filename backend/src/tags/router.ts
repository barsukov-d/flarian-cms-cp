import { Effect } from 'effect';
import { HttpRouter, HttpServerResponse } from '@effect/platform';
import { Db } from '../db/client.js';
import { tags } from '../db/schema.js';

export const tagsRouter = HttpRouter.empty.pipe(
	HttpRouter.get(
		'/tags',
		Effect.gen(function* () {
			const db = yield* Db;
			return yield* HttpServerResponse.json(db.select().from(tags).all());
		}),
	),
);
