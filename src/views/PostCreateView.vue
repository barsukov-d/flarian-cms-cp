<script setup lang="ts">
import { useMutation, useQuery } from 'vue-query';
import { PostsService } from '@/http-client/services/PostsService';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { computed, ref, watch } from 'vue';
import { CategoriesService } from '@/http-client/services/CategoriesService';
import { TagsService } from '@/http-client/services/TagsService';

import { useRouter } from 'vue-router';

const postCreate = useMutation(() =>
	PostsService.postsControllerCreate({ requestBody: form.value }),
);
const categoriesFindAll = useQuery('categories', () =>
	CategoriesService.categoriesControllerFindAll(),
);
const categories = ref();

const tagsFindAll = useQuery('tags', () => TagsService.tagsControllerFindAll());

const tags = ref();

const form = ref({
	title: '',
	description: '',
	content: '',
	image: '',
	categoryId: 1,
	tagIds: [],
	publicationStatus: 'draft',
	author: '',
	metaTags: '',
});

const optionsCategories = computed(() => {
	if (categoriesFindAll.data.value) {
		return categoriesFindAll.data.value.map((category: any) => category.name);
	}
	return [];
});

const optionsTags = computed(() => {
	if (tagsFindAll.data.value) {
		return tagsFindAll.data.value.map((tag: any) => tag.name);
	}
	return [];
});

watch(
	() => categories.value,
	() => {
		const category = categoriesFindAll.data.value.find(
			(category: any) => category.name === categories.value,
		);
		if (category) {
			form.value.categoryId = category.id;
		}
	},
);

watch(
	() => tags.value,
	() => {
		const tagsIds = tagsFindAll.data.value
			.filter((tag: any) => tags.value.includes(tag.name))
			.map((tag: any) => tag.id);
		form.value.tagIds = tagsIds;
	},
);

const optionPublicationStatus = ['draft', 'published'];
const optionMetaTags = ['fes', 'sport', 'hot'];

const onSubmit = () => {
	postCreate.mutate(form.value);
};

const router = useRouter();
watch(
	() => postCreate.isSuccess,
	() => {
		if (postCreate.isSuccess.value) {
			router.push('/posts');
		}
	},
	{ deep: true },
);
</script>

<template>
	<h3 class="text-h3">Post create</h3>
	<div style="max-width: 100%">
		<QForm @submit="onSubmit" class="q-gutter-md">
			<QInput
				filled
				v-model="form.title"
				label="Post title*"
				lazy-rules
				:rules="[(val) => (val && val.length > 0) || 'Please type something']"
			/>

			<QInput
				filled
				v-model="form.description"
				label="Post description *"
				lazy-rules
				:rules="[(val) => (val && val.length > 0) || 'Please type your age']"
			/>

			<div>
				<h6 class="text-h6 q-my-sm">Content editor</h6>
				<QuillEditor theme="snow" contentType="html" v-model:content="form.content" />
			</div>

			<QSelect
				filled
				v-model="categories"
				:options="optionsCategories"
				label="Categories"
				class="q-mt-xl"
			/>

			<QSelect
				filled
				v-model="tags"
				multiple
				:options="optionsTags"
				label="Tags"
				class="q-mt-xl"
			/>

			<QSelect
				filled
				v-model="form.publicationStatus"
				:options="optionPublicationStatus"
				label="Publication status"
				class="q-mt-xl"
			/>

			<QInput
				filled
				v-model="form.author"
				label="Author *"
				lazy-rules
				:rules="[(val) => (val && val.length > 0) || 'Please type your age']"
				class="q-mt-xl"
			/>

			<QSelect
				filled
				v-model="form.metaTags"
				:options="optionMetaTags"
				multiple
				label="Meta tags"
				class="q-mt-xl"
			/>

			<QBtn class="q-my-xl" label="Create" type="submit" color="primary" />
		</QForm>
	</div>
</template>
