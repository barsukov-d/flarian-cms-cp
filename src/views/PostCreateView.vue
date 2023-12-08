<script setup lang="ts">
import { useMutation, useQuery } from 'vue-query';
import { PostsService } from '@/http-client/services/PostsService';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { computed, ref, watchEffect } from 'vue';
import { useCategory } from '@/hooks/useCategory';
import { useTag } from '@/hooks/useTag';
import FormPost from '@/components/FormPost.vue';
import { useRouter } from 'vue-router';
import type { CreatePostDto } from '@/http-client/models/CreatePostDto';

const { optionsCategories, getCategoryIdByName } = useCategory();
const { optionsTags, getTagsIdByNames } = useTag();

const formData = ref({
	title: '111',
	description: '222',
	content: '',
	image: '',
	optionsCategories: optionsCategories,
	categoryName: '',
	optionsTags: optionsTags,
	tagsName: [],
	optionsPublicationStatus: ['draft', 'published'],
	publicationStatus: '',
	author: 'Dima',
	metaTags: '',
});

const requestData: CreatePostDto = {
	title: '',
	description: '',
	content: '',
	image: '',
	categoryId: 1,
	tagIds: [],
	publicationStatus: 'draft',
	author: '',
	metaTags: '',
};

const prepareData = (data: any) => {
	requestData.title = data.title;
	requestData.description = data.description;
	requestData.content = data.content;
	requestData.image = data.image;
	requestData.categoryId = getCategoryIdByName(data.categoryName);
	requestData.tagIds = getTagsIdByNames(data.tagsName);
	requestData.publicationStatus = data.publicationStatus;
	requestData.author = data.author;
	requestData.metaTags = data.metaTags;
};

const postCreate = useMutation(() =>
	PostsService.postsControllerCreate({ requestBody: requestData }),
);

const onSubmit = (data: any) => {
	prepareData(data);
	postCreate.mutate();
};
</script>

<template>
	<h3 class="text-h3">Post create</h3>

	<div style="max-width: 100%">
		<FormPost :form="formData" @submit="onSubmit" />
	</div>
</template>
