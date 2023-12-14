<script setup lang="ts">
import { useGetPostById } from '@/hooks/useGetPostById';
import { computed, onMounted, ref, watch } from 'vue';
import FormPost from '@/components/FormPost.vue';
import { useCategory } from '@/hooks/useCategory';
import { useTag } from '@/hooks/useTag';
import type { UpdatePostDto } from '@/http-client/models/UpdatePostDto';
import { useMutation } from 'vue-query';
import { PostsService } from '@/http-client/services/PostsService';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const { optionsCategories, getCategoryIdByName } = useCategory();
const { optionsTags, getTagsIdByNames } = useTag();

const { data, isSuccess, isLoading } = useGetPostById();

let formData = {
	title: '',
	description: '',
	content: '',
	image: '',
	optionsCategories: ['cedsvfd '] as string[],
	categoryName: '',
	optionsTags: ['ssdc'] as string[],
	tagsName: [] as string[],
	optionsPublicationStatus: ['draft', 'published'],
	publicationStatus: '',
	author: '',
	metaTags: '',
};

watch(
	() => data.value,
	() => {
		if (data.value) {
			formData.title = data.value.title;
			formData.description = data.value.description;
			formData.content = data.value.content;
			formData.image = data.value.image;
			formData.optionsCategories = optionsCategories.value;
			formData.categoryName = data.value.category.name;
			formData.optionsTags = optionsTags.value;
			formData.tagsName = data.value.tags.map((tag: any) => tag.name);
			formData.optionsPublicationStatus = ['draft', 'published'];
			formData.publicationStatus = data.value.publicationStatus;
			formData.author = data.value.author;
			formData.metaTags = data.value.metaTags;

			console.log(data.value, 'data-post');
		}
	},
	{ deep: true, immediate: true },
);

const requestData: UpdatePostDto = {
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

const postUpdate = useMutation(() =>
	PostsService.postsControllerUpdate({
		id: data.value.id,
		requestBody: requestData,
	}),
);

const router = useRouter();

const onSubmit = (data: any) => {
	prepareData(data);
	postUpdate.mutate();
};

watch(
	() => postUpdate.isSuccess.value,
	() => {
		if (postUpdate.isSuccess.value) {
			router.push('/posts');
		}
	},
);

const $q = useQuasar();

const handleDeletePost = () => {
	$q.dialog({
		title: 'Confirm',
		message: 'Would you like to delete post?',
		cancel: true,
		persistent: true,
	})
		.onOk(() => {
			PostsService.postsControllerRemove({ id: data.value.id });
			router.push('/posts');
		})
		.onCancel(() => {
			// console.log('>>>> Cancel')
		})
		.onDismiss(() => {
			// console.log('I am triggered on both OK and Cancel')
		});
};
</script>

<template>
	<h3 class="text-h3">Post</h3>

	<FormPost :form="formData" @submit="onSubmit" :isSuccess="isSuccess" :buttonName="'Update'" />

	<QBtn class="q-mb-xl" color="negative" label="Delete" @click="handleDeletePost"> </QBtn>
</template>
