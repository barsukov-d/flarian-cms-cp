import { HttpRouter, HttpServerResponse } from '@effect/platform';

// Real file upload/listing/storage stays on the existing frontend fetch mock (out of scope).
// This stub only keeps the Post form's image picker from erroring against the real backend.
export const filesRouter = HttpRouter.empty.pipe(
	HttpRouter.get('/files/all-webp', HttpServerResponse.json([])),
);
