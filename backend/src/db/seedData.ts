// Reference data mirroring src/mocks/store.ts, so the frontend renders identically
// whether it talks to the fetch mock or this backend.

export const seedCategories = [
	{ id: 1, name: 'News', createdAt: '2026-01-01T09:00:00.000Z' },
	{ id: 2, name: 'Guides', createdAt: '2026-01-02T09:00:00.000Z' },
];

export const seedTags = [
	{ id: 1, name: 'vue', createdAt: '2026-01-01T09:00:00.000Z' },
	{ id: 2, name: 'quasar', createdAt: '2026-01-01T09:00:00.000Z' },
	{ id: 3, name: 'typescript', createdAt: '2026-01-01T09:00:00.000Z' },
];

export const seedPosts = [
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
