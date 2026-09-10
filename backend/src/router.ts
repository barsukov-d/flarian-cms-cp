import { HttpRouter, HttpServerResponse } from '@effect/platform';
import { categoriesRouter } from './categories/router.js';
import { filesRouter } from './files/router.js';
import { postsRouter } from './posts/router.js';
import { tagsRouter } from './tags/router.js';

const notFoundResponse = (message: string) =>
	HttpServerResponse.json({ statusCode: 404, message }, { status: 404 });

export const apiRouter = HttpRouter.empty.pipe(
	HttpRouter.concat(postsRouter),
	HttpRouter.concat(categoriesRouter),
	HttpRouter.concat(tagsRouter),
	HttpRouter.concat(filesRouter),
	HttpRouter.all('*', notFoundResponse('Not Found')),
	HttpRouter.catchTag('NotFoundError', (error) => notFoundResponse(error.message)),
);

export const router = HttpRouter.empty.pipe(HttpRouter.mount('/api', apiRouter));
