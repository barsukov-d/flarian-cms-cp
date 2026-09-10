import { afterAll, describe, expect, it } from 'vitest';
import { HttpApp } from '@effect/platform';
import { DbTest } from '../db/client.js';
import { router } from '../router.js';

const { handler, dispose } = HttpApp.toWebHandlerLayer(router, DbTest);
afterAll(() => dispose());

describe('files router', () => {
	it('GET /api/files/all-webp responds with an array so the image picker does not error', async () => {
		const response = await handler(new Request('http://localhost/api/files/all-webp'));
		expect(response.status).toBe(200);

		const body = await response.json();
		expect(Array.isArray(body)).toBe(true);
	});
});
