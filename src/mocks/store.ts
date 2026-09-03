import type { CreateCategoryDto } from '@/http-client/models/CreateCategoryDto';
import type { UpdateCategoryDto } from '@/http-client/models/UpdateCategoryDto';
import type { CreateTagDto } from '@/http-client/models/CreateTagDto';
import type { UpdateTagDto } from '@/http-client/models/UpdateTagDto';
import type { CreatePostDto } from '@/http-client/models/CreatePostDto';
import type { UpdatePostDto } from '@/http-client/models/UpdatePostDto';

export type MockCategory = {
	id: number;
	name: string;
	createdAt: string;
};

export type MockTag = {
	id: number;
	name: string;
	createdAt: string;
};

export type MockFile = {
	id: string;
	fileUuid: string;
	name: string;
	url: string;
	createdAt: string;
};

export type MockPost = {
	id: number;
	title: string;
	description: string;
	content: string;
	image: string;
	categoryId: number;
	tagIds: number[];
	publicationStatus: string;
	author: string;
	metaTags: string;
	createdAt: string;
};

const categories: MockCategory[] = [
	{ id: 1, name: 'News', createdAt: '2026-01-01T09:00:00.000Z' },
	{ id: 2, name: 'Guides', createdAt: '2026-01-02T09:00:00.000Z' },
];

const tags: MockTag[] = [
	{ id: 1, name: 'vue', createdAt: '2026-01-01T09:00:00.000Z' },
	{ id: 2, name: 'quasar', createdAt: '2026-01-01T09:00:00.000Z' },
	{ id: 3, name: 'typescript', createdAt: '2026-01-01T09:00:00.000Z' },
];

const files: MockFile[] = [
	{
		id: 'mock-file-1',
		fileUuid: 'mock-file-1',
		name: 'sample-1.jpg',
		url: 'sample-1.jpg',
		createdAt: '2026-01-01T09:00:00.000Z',
	},
	{
		id: 'mock-file-2',
		fileUuid: 'mock-file-2',
		name: 'sample-2.jpg',
		url: 'sample-2.jpg',
		createdAt: '2026-01-01T09:00:00.000Z',
	},
];

const posts: MockPost[] = [
	{
		id: 1,
		title: 'Welcome to Flarian CMS',
		description: 'An introduction post rendered from mock data.',
		content: '<p>This post is served by the client-side API mock layer.</p>',
		image: 'sample-1.jpg',
		categoryId: 1,
		tagIds: [1, 2],
		publicationStatus: 'published',
		author: 'Admin',
		metaTags: 'welcome, cms',
		createdAt: '2026-01-03T09:00:00.000Z',
	},
	{
		id: 2,
		title: 'Getting started with mocks',
		description: 'A draft post to exercise the create/update flows.',
		content: '<p>Edit this post to see the mock store update in place.</p>',
		image: 'sample-2.jpg',
		categoryId: 2,
		tagIds: [3],
		publicationStatus: 'draft',
		author: 'Admin',
		metaTags: 'mock, dev',
		createdAt: '2026-01-04T09:00:00.000Z',
	},
];

const nextId = (records: Array<{ id: number }>): number =>
	records.reduce((max, record) => Math.max(max, record.id), 0) + 1;

const nextFileId = (): string => `mock-file-${files.length + 1}-${Date.now()}`;

const serializePost = (post: MockPost) => ({
	...post,
	category: categories.find((category) => category.id === post.categoryId) ?? null,
	tags: tags.filter((tag) => post.tagIds.includes(tag.id)),
});

export const listCategories = (): MockCategory[] => categories;

export const getCategory = (id: number): MockCategory | undefined =>
	categories.find((category) => category.id === id);

export const createCategory = (dto: CreateCategoryDto): MockCategory => {
	const category: MockCategory = {
		id: nextId(categories),
		name: dto.name,
		createdAt: new Date().toISOString(),
	};
	categories.push(category);
	return category;
};

export const updateCategory = (id: number, dto: UpdateCategoryDto): MockCategory | undefined => {
	const category = getCategory(id);
	if (!category) return undefined;
	if (dto.name !== undefined) category.name = dto.name;
	return category;
};

export const listTags = (): MockTag[] => tags;

export const getTag = (id: number): MockTag | undefined => tags.find((tag) => tag.id === id);

export const createTag = (dto: CreateTagDto): MockTag => {
	const tag: MockTag = {
		id: nextId(tags),
		name: dto.name,
		createdAt: new Date().toISOString(),
	};
	tags.push(tag);
	return tag;
};

export const updateTag = (id: number, dto: UpdateTagDto): MockTag | undefined => {
	const tag = getTag(id);
	if (!tag) return undefined;
	if (dto.name !== undefined) tag.name = dto.name;
	return tag;
};

export const listPosts = () => posts.map(serializePost);

export const getPost = (id: number) => {
	const post = posts.find((item) => item.id === id);
	return post ? serializePost(post) : undefined;
};

export const createPost = (dto: CreatePostDto) => {
	const post: MockPost = {
		id: nextId(posts),
		title: dto.title,
		description: dto.description,
		content: dto.content,
		image: dto.image,
		categoryId: dto.categoryId,
		tagIds: dto.tagIds,
		publicationStatus: dto.publicationStatus,
		author: dto.author,
		metaTags: dto.metaTags,
		createdAt: new Date().toISOString(),
	};
	posts.push(post);
	return serializePost(post);
};

export const updatePost = (id: number, dto: UpdatePostDto) => {
	const post = posts.find((item) => item.id === id);
	if (!post) return undefined;
	if (dto.title !== undefined) post.title = dto.title;
	if (dto.description !== undefined) post.description = dto.description;
	if (dto.content !== undefined) post.content = dto.content;
	if (dto.image !== undefined) post.image = dto.image;
	if (dto.categoryId !== undefined) post.categoryId = dto.categoryId;
	if (dto.tagIds !== undefined) post.tagIds = dto.tagIds;
	if (dto.publicationStatus !== undefined) post.publicationStatus = dto.publicationStatus;
	if (dto.author !== undefined) post.author = dto.author;
	if (dto.metaTags !== undefined) post.metaTags = dto.metaTags;
	return serializePost(post);
};

export const removePost = (id: number): boolean => {
	const index = posts.findIndex((item) => item.id === id);
	if (index === -1) return false;
	posts.splice(index, 1);
	return true;
};

export const listFiles = (): MockFile[] => files;

export const createFile = (name: string): MockFile => {
	const id = nextFileId();
	const file: MockFile = {
		id,
		fileUuid: id,
		name,
		url: name,
		createdAt: new Date().toISOString(),
	};
	files.push(file);
	return file;
};

export const removeFile = (id: string): boolean => {
	const index = files.findIndex((file) => file.fileUuid === id || file.id === id);
	if (index === -1) return false;
	files.splice(index, 1);
	return true;
};
