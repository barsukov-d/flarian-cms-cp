import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('../views/LoginView.vue'),
		},
		{
			path: '/posts',
			name: 'posts',
			component: () => import('../views/PostsView.vue'),
		},
		{
			path: '/post/:id',
			name: 'post',
			component: () => import('../views/PostView.vue'),
		},
		{
			path: '/post/create',
			name: 'post-create',
			component: () => import('../views/PostCreateView.vue'),
		},

		{
			path: '/categories',
			name: 'categories',
			component: () => import('../views/CategoriesView.vue'),
		},
		{
			path: '/category/:id',
			name: 'category',
			component: () => import('../views/CategoryView.vue'),
		},
		{
			path: '/category/create',
			name: 'category-create',
			component: () => import('../views/CategoryCreateView.vue'),
		},

		{
			path: '/tags',
			name: 'tags',
			component: () => import('../views/TagsView.vue'),
		},
		{
			path: '/tag/:id',
			name: 'tag',
			component: () => import('../views/TagView.vue'),
		},
		{
			path: '/tag/create',
			name: 'tag-create',
			component: () => import('../views/TagCreateView.vue'),
		},

		{
			path: '/about',
			name: 'about',
			component: () => import('../views/AboutView.vue'),
		},
	],
});

export default router;
