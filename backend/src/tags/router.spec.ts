import { afterAll, describe, expect, it } from 'vitest';
import { HttpApp } from '@effect/platform';
import { DbTest } from '../db/client.js';
import { router } from '../router.js';

const { handler, dispose } = HttpApp.toWebHandlerLayer(router, DbTest);
afterAll(() => dispose());

describe('tags router', () => {
	it('GET /api/tags returns the seeded tags', async () => {
		const response = await handler(new Request('http://localhost/api/tags'));
		expect(response.status).toBe(200);

		const body = await response.json();
		expect(Array.isArray(body)).toBe(true);
		expect(body.length).toBeGreaterThanOrEqual(3);
		expect(body[0]).toMatchObject({
			id: expect.any(Number),
			name: expect.any(String),
			createdAt: expect.any(String),
		});
		expect(body.map((tag: { name: string }) => tag.name)).toEqual(
			expect.arrayContaining(['vue', 'quasar', 'typescript']),
		);
	});
});
