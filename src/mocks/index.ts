import { OpenAPI } from '@/http-client/core/OpenAPI';
import { handleMockRequest, MOCK_LOGIN, MOCK_PASSWORD } from './fetchMock';

// Patches the global fetch used by src/http-client/core/request.ts so every
// request to the configured backend (OpenAPI.BASE) is served from the
// in-memory mock store instead of hitting the real network. Requests to any
// other origin are left untouched.
export const setupMockApi = (): void => {
	const originalFetch = window.fetch.bind(window);

	window.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
		const url = typeof input === 'string' || input instanceof URL ? input.toString() : input.url;

		if (url.startsWith(OpenAPI.BASE)) {
			return handleMockRequest(url, init ?? {});
		}

		return originalFetch(input, init);
	}) as typeof window.fetch;

	// eslint-disable-next-line no-console
	console.info(
		`[mock-api] VITE_MOCK_API=true — API requests are served from an in-memory mock. Login with "${MOCK_LOGIN}" / "${MOCK_PASSWORD}".`,
	);
};
