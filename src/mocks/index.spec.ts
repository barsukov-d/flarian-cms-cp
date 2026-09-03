import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { OpenAPI } from '@/http-client/core/OpenAPI';
import { AuthService } from '@/http-client/services/AuthService';
import { CategoriesService } from '@/http-client/services/CategoriesService';
import { setupMockApi } from './index';
import { MOCK_LOGIN, MOCK_PASSWORD } from './fetchMock';

// These tests exercise the real interception point (global fetch, patched by
// setupMockApi) through the actual generated API client, not handleMockRequest
// directly — this is what AC1/AC2 ("requests do/don't reach the real backend")
// depend on, as opposed to fetchMock.spec.ts which only checks handler logic.

describe('setupMockApi runtime fetch interception', () => {
	const originalFetch = globalThis.fetch;
	let networkSpy: ReturnType<typeof vi.fn>;

	beforeEach(() => {
		OpenAPI.BASE = 'http://mock.local/api';
		networkSpy = vi.fn(async () => new Response(null, { status: 599 }));
		globalThis.fetch = networkSpy as unknown as typeof fetch;
		window.fetch = networkSpy as unknown as typeof fetch;
	});

	afterEach(() => {
		globalThis.fetch = originalFetch;
		window.fetch = originalFetch;
	});

	it('without setupMockApi (VITE_MOCK_API off), requests to the configured backend go out over the real fetch', async () => {
		await expect(CategoriesService.categoriesControllerFindAll()).rejects.toBeTruthy();

		expect(networkSpy).toHaveBeenCalledTimes(1);
		expect(networkSpy.mock.calls[0][0]).toContain(OpenAPI.BASE);
	});

	it('after setupMockApi(), requests through the real API client never reach the real fetch and are served by the mock', async () => {
		setupMockApi();

		const categories = (await CategoriesService.categoriesControllerFindAll()) as unknown[];

		expect(Array.isArray(categories)).toBe(true);
		expect(categories.length).toBeGreaterThan(0);
		expect(networkSpy).not.toHaveBeenCalled();
	});

	it('after setupMockApi(), the documented mock credentials succeed and any other credentials 401 — both without touching the network', async () => {
		setupMockApi();

		const ok = (await AuthService.authControllerLogin({
			requestBody: { login: MOCK_LOGIN, password: MOCK_PASSWORD },
		})) as unknown as { accessToken: string };
		expect(ok.accessToken).toBeTruthy();

		await expect(
			AuthService.authControllerLogin({ requestBody: { login: 'wrong', password: 'wrong' } }),
		).rejects.toBeTruthy();

		expect(networkSpy).not.toHaveBeenCalled();
	});

	it('after setupMockApi(), requests to a different origin still pass through to the real fetch', async () => {
		setupMockApi();

		await window.fetch('https://example.com/unrelated');

		expect(networkSpy).toHaveBeenCalledTimes(1);
	});
});
