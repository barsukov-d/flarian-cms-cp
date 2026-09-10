import { afterAll, describe, expect, it } from 'vitest';
import { HttpApp } from '@effect/platform';
import { DbTest } from '../db/client.js';
import { router } from '../router.js';

const { handler, dispose } = HttpApp.toWebHandlerLayer(router, DbTest);
afterAll(() => dispose());

describe('categories router', () => {
	it('GET /api/categories returns the seeded categories', async () => {
		const response = await handler(new Request('http://localhost/api/categories'));
		expect(response.status).toBe(200);

		const body = await response.json();
		expect(Array.isArray(body)).toBe(true);
		expect(body.length).toBeGreaterThanOrEqual(2);
		expect(body[0]).toMatchObject({
			id: expect.any(Number),
			name: expect.any(String),
			createdAt: expect.any(String),
		});
		expect(body.map((category: { name: string }) => category.name)).toContain('News');
	});
});
