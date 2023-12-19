<script setup lang="ts">
import type { CreatePostDto } from '@/http-client/models/CreatePostDto';
import { onMounted, ref, watch, watchEffect } from 'vue';
import { QuillEditor } from '@vueup/vue-quill';

const props = defineProps<{
	form?: {
		title: string;
		description: string;
		content: string;
		image: string;
		optionsCategories: string[];
		categoryName: string;
		optionsTags: string[];
		tagsName: string[];
		optionsPublicationStatus: string[];
		publicationStatus: string;
		author: string;
		metaTags: string;
	};
	isSuccess?: boolean;
	buttonName?: string;
}>();

const emit = defineEmits<{
	(e: 'submit', requestData: any): void;
}>();

const formModel = ref({
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
});

watch(
	() => props.form,
	() => {
		if (!props.form) return;
		formModel.value.title = props.form.title;
		formModel.value.description = props.form.description;
		formModel.value.content = props.form.content;
		formModel.value.image = props.form.image;
		formModel.value.optionsCategories = props.form.optionsCategories;
		formModel.value.categoryName = props.form.categoryName;
		formModel.value.optionsTags = props.form.optionsTags;
		formModel.value.tagsName = props.form.tagsName;
		formModel.value.optionsPublicationStatus = props.form.optionsPublicationStatus;
		formModel.value.publicationStatus = props.form.publicationStatus;
		formModel.value.author = props.form.author;
		formModel.value.metaTags = props.form.metaTags;
	},
	{ deep: true, immediate: true },
);

const onSubmit = () => {
	emit('submit', formModel.value);
};
</script>

<template>
	<div style="max-width: 100%">
		<QForm @submit="onSubmit" class="q-gutter-md">
			<QInput
				filled
				v-model="formModel.title"
				label="Post title*"
				lazy-rules
				:rules="[(val) => (val && val.length > 0) || 'Please type something']"
			/>

			<QInput
				filled
				v-model="formModel.description"
				label="Post description *"
				lazy-rules
				:rules="[(val) => (val && val.length > 0) || 'Please type your age']"
			/>

			<div>
				<h6 class="text-h6 q-my-sm">Content editor</h6>
				<QuillEditor theme="snow" contentType="html" v-model:content="formModel.content" />
			</div>

			<QSelect
				filled
				v-model="formModel.categoryName"
				:options="formModel.optionsCategories"
				label="Categories"
				class="q-mt-xl"
			/>

			<QSelect
				filled
				v-model="formModel.tagsName"
				multiple
				:options="formModel.optionsTags"
				label="Tags"
				class="q-mt-xl"
			/>

			<QSelect
				filled
				v-model="formModel.publicationStatus"
				:options="formModel.optionsPublicationStatus"
				label="Publication status"
				class="q-mt-xl"
			/>

			<QInput
				filled
				v-model="formModel.author"
				label="Author *"
				lazy-rules
				:rules="[(val) => (val && val.length > 0) || 'Please type your age']"
				class="q-mt-xl"
			/>

			<QInput
				filled
				v-model="formModel.metaTags"
				label="Meta tags"
				lazy-rules
				class="q-mt-xl"
			/>

			<QBtn class="q-my-xl" :label="props.buttonName" type="submit" color="primary" />
		</QForm>
	</div>
</template>
