import { describe, it, expect, beforeEach } from 'vitest';
import { OpenAPI } from '@/http-client/core/OpenAPI';
import { handleMockRequest, MOCK_LOGIN, MOCK_PASSWORD } from './fetchMock';

const BASE = 'http://mock.local/api';

const call = (path: string, init: RequestInit = {}) => handleMockRequest(`${BASE}${path}`, init);

const json = (body: unknown, method: string): RequestInit => ({
	method,
	body: JSON.stringify(body),
});

beforeEach(() => {
	OpenAPI.BASE = BASE;
});

describe('mock auth', () => {
	it('accepts the documented mock credentials', async () => {
		const res = await call('/auth/login', json({ login: MOCK_LOGIN, password: MOCK_PASSWORD }, 'POST'));
		expect(res.status).toBe(200);
		const body = await res.json();
		expect(body.accessToken).toBeTruthy();
	});

	it('rejects any other credentials with a 401-shaped error', async () => {
		const res = await call('/auth/login', json({ login: 'nope', password: 'nope' }, 'POST'));
		expect(res.status).toBe(401);
	});
});

describe('mock categories', () => {
	it('lists seeded categories and reflects create/update in subsequent reads', async () => {
		const list = await (await call('/categories')).json();
		expect(Array.isArray(list)).toBe(true);
		expect(list.length).toBeGreaterThan(0);

		const created = await (await call('/categories', json({ name: 'Smoke' }, 'POST'))).json();
		expect(created.name).toBe('Smoke');

		const updated = await (
			await call(`/categories/${created.id}`, json({ name: 'Smoke Updated' }, 'PATCH'))
		).json();
		expect(updated.name).toBe('Smoke Updated');

		const fetched = await (await call(`/categories/${created.id}`)).json();
		expect(fetched.name).toBe('Smoke Updated');
	});
});

describe('mock tags', () => {
	it('supports create/update roundtrip', async () => {
		const created = await (await call('/tags', json({ name: 'smoke-tag' }, 'POST'))).json();
		expect(created.name).toBe('smoke-tag');

		const updated = await (
			await call(`/tags/${created.id}`, json({ name: 'smoke-tag-2' }, 'PATCH'))
		).json();
		expect(updated.name).toBe('smoke-tag-2');
	});
});

describe('mock posts', () => {
	it('creates a post, nests category/tags, updates and removes it', async () => {
		const created = await (
			await call(
				'/posts',
				json(
					{
						title: 'Smoke post',
						description: 'desc',
						content: '<p>content</p>',
						image: 'x.jpg',
						categoryId: 1,
						tagIds: [1],
						publicationStatus: 'draft',
						author: 'Tester',
						metaTags: 'a,b',
					},
					'POST',
				),
			)
		).json();
		expect(created.title).toBe('Smoke post');
		expect(created.category?.id).toBe(1);
		expect(created.tags?.[0]?.id).toBe(1);

		const updated = await (
			await call(`/posts/${created.id}`, json({ title: 'Smoke post updated' }, 'PATCH'))
		).json();
		expect(updated.title).toBe('Smoke post updated');

		const removeRes = await call(`/posts/${created.id}`, { method: 'DELETE' });
		expect(removeRes.status).toBe(200);

		const afterRemove = await call(`/posts/${created.id}`);
		expect(afterRemove.status).toBe(404);
	});
});

describe('mock files', () => {
	it('uploads and removes a file', async () => {
		const formData = new FormData();
		formData.append('files', new File(['x'], 'smoke.png', { type: 'image/png' }));

		const uploaded = await (await call('/files/upload', { method: 'POST', body: formData })).json();
		expect(uploaded[0].name).toBe('smoke.png');

		const listed = await (await call('/files/all-webp')).json();
		expect(listed.some((file: { fileUuid: string }) => file.fileUuid === uploaded[0].fileUuid)).toBe(
			true,
		);

		const removeRes = await call(`/files/${uploaded[0].fileUuid}`, { method: 'DELETE' });
		expect(removeRes.status).toBe(200);

		const listedAfter = await (await call('/files/all-webp')).json();
		expect(listedAfter.some((file: { fileUuid: string }) => file.fileUuid === uploaded[0].fileUuid)).toBe(
			false,
		);
	});
});

describe('unmatched routes', () => {
	it('returns a 404 instead of falling through to the network', async () => {
		const res = await call('/unknown-endpoint');
		expect(res.status).toBe(404);
	});
});
