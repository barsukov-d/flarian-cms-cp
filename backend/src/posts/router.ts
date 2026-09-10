import { Effect } from 'effect';
import { HttpRouter, HttpServerRequest, HttpServerResponse } from '@effect/platform';
import { Db } from '../db/client.js';
import { NotFoundError } from '../http/errors.js';
import * as repository from './repository.js';

export const postsRouter = HttpRouter.empty.pipe(
	HttpRouter.get(
		'/posts',
		Effect.gen(function* () {
			const db = yield* Db;
			return yield* HttpServerResponse.json(repository.listPosts(db));
		}),
	),
	HttpRouter.post(
		'/posts',
		Effect.gen(function* () {
			const db = yield* Db;
			const request = yield* HttpServerRequest.HttpServerRequest;
			const dto = (yield* request.json) as repository.CreatePostInput;
			const created = repository.createPost(db, dto);
			return yield* HttpServerResponse.json(created, { status: 201 });
		}),
	),
	HttpRouter.get(
		'/posts/:id',
		Effect.gen(function* () {
			const db = yield* Db;
			const params = yield* HttpRouter.params;
			const id = Number(params.id);
			const post = repository.getPost(db, id);
			if (!post) return yield* new NotFoundError({ message: `Post ${params.id} not found` });
			return yield* HttpServerResponse.json(post);
		}),
	),
	HttpRouter.patch(
		'/posts/:id',
		Effect.gen(function* () {
			const db = yield* Db;
			const params = yield* HttpRouter.params;
			const id = Number(params.id);
			const request = yield* HttpServerRequest.HttpServerRequest;
			const dto = (yield* request.json) as repository.UpdatePostInput;
			const updated = repository.updatePost(db, id, dto);
			if (!updated) return yield* new NotFoundError({ message: `Post ${params.id} not found` });
			return yield* HttpServerResponse.json(updated);
		}),
	),
	HttpRouter.del(
		'/posts/:id',
		Effect.gen(function* () {
			const db = yield* Db;
			const params = yield* HttpRouter.params;
			const id = Number(params.id);
			const removed = repository.removePost(db, id);
			if (!removed) return yield* new NotFoundError({ message: `Post ${params.id} not found` });
			return yield* HttpServerResponse.json({ success: true });
		}),
	),
);
