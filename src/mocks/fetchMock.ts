import type { AuthDto } from '@/http-client/models/AuthDto';
import type { CreateCategoryDto } from '@/http-client/models/CreateCategoryDto';
import type { UpdateCategoryDto } from '@/http-client/models/UpdateCategoryDto';
import type { CreateTagDto } from '@/http-client/models/CreateTagDto';
import type { UpdateTagDto } from '@/http-client/models/UpdateTagDto';
import type { CreatePostDto } from '@/http-client/models/CreatePostDto';
import type { UpdatePostDto } from '@/http-client/models/UpdatePostDto';
import { OpenAPI } from '@/http-client/core/OpenAPI';
import * as store from './store';

// Fixed mock login used when VITE_MOCK_API=true (documented in .env.example).
export const MOCK_LOGIN = 'admin';
export const MOCK_PASSWORD = 'admin';

const jsonResponse = (status: number, body: unknown): Response =>
	new Response(JSON.stringify(body), {
		status,
		headers: { 'Content-Type': 'application/json' },
	});

const notFound = (): Response => jsonResponse(404, { statusCode: 404, message: 'Not Found' });

const parseJsonBody = <T>(body: BodyInit | null | undefined): T => JSON.parse(body as string) as T;

export const handleMockRequest = async (url: string, init: RequestInit): Promise<Response> => {
	const path = url.slice(OpenAPI.BASE.length).split('?')[0];
	const method = (init.method ?? 'GET').toUpperCase();

	if (path === '/auth/login' && method === 'POST') {
		const dto = parseJsonBody<AuthDto>(init.body);
		if (dto.login === MOCK_LOGIN && dto.password === MOCK_PASSWORD) {
			return jsonResponse(200, {
				accessToken: 'mock-access-token',
				user: { email: 'admin@example.com' },
			});
		}
		return jsonResponse(401, { statusCode: 401, message: 'Unauthorized' });
	}

	if (path === '/posts' && method === 'POST') {
		const dto = parseJsonBody<CreatePostDto>(init.body);
		return jsonResponse(201, store.createPost(dto));
	}
	if (path === '/posts' && method === 'GET') {
		return jsonResponse(200, store.listPosts());
	}
	const postMatch = path.match(/^\/posts\/([^/]+)$/);
	if (postMatch) {
		const id = Number(postMatch[1]);
		if (method === 'GET') {
			const post = store.getPost(id);
			return post ? jsonResponse(200, post) : notFound();
		}
		if (method === 'PATCH') {
			const dto = parseJsonBody<UpdatePostDto>(init.body);
			const post = store.updatePost(id, dto);
			return post ? jsonResponse(200, post) : notFound();
		}
		if (method === 'DELETE') {
			return store.removePost(id) ? jsonResponse(200, { success: true }) : notFound();
		}
	}

	if (path === '/categories' && method === 'POST') {
		const dto = parseJsonBody<CreateCategoryDto>(init.body);
		return jsonResponse(201, store.createCategory(dto));
	}
	if (path === '/categories' && method === 'GET') {
		return jsonResponse(200, store.listCategories());
	}
	const categoryMatch = path.match(/^\/categories\/([^/]+)$/);
	if (categoryMatch) {
		const id = Number(categoryMatch[1]);
		if (method === 'GET') {
			const category = store.getCategory(id);
			return category ? jsonResponse(200, category) : notFound();
		}
		if (method === 'PATCH') {
			const dto = parseJsonBody<UpdateCategoryDto>(init.body);
			const category = store.updateCategory(id, dto);
			return category ? jsonResponse(200, category) : notFound();
		}
	}

	if (path === '/tags' && method === 'POST') {
		const dto = parseJsonBody<CreateTagDto>(init.body);
		return jsonResponse(201, store.createTag(dto));
	}
	if (path === '/tags' && method === 'GET') {
		return jsonResponse(200, store.listTags());
	}
	const tagMatch = path.match(/^\/tags\/([^/]+)$/);
	if (tagMatch) {
		const id = Number(tagMatch[1]);
		if (method === 'GET') {
			const tag = store.getTag(id);
			return tag ? jsonResponse(200, tag) : notFound();
		}
		if (method === 'PATCH') {
			const dto = parseJsonBody<UpdateTagDto>(init.body);
			const tag = store.updateTag(id, dto);
			return tag ? jsonResponse(200, tag) : notFound();
		}
	}

	if (path === '/files/upload' && method === 'POST') {
		const formData = init.body as FormData;
		const uploaded = formData.getAll('files') as File[];
		const created = uploaded.map((file) => store.createFile(file.name || 'upload.bin'));
		return jsonResponse(201, created);
	}
	if (path === '/files/all' && method === 'GET') {
		return jsonResponse(200, store.listFiles());
	}
	if (path === '/files/all-webp' && method === 'GET') {
		return jsonResponse(200, store.listFiles());
	}
	const fileMatch = path.match(/^\/files\/([^/]+)$/);
	if (fileMatch && method === 'DELETE') {
		return store.removeFile(fileMatch[1]) ? jsonResponse(200, { success: true }) : notFound();
	}

	return notFound();
};
