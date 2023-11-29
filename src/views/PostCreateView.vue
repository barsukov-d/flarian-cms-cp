<script setup lang="ts">
import { useMutation } from 'vue-query';
import { PostsService } from '@/http-client/services/PostsService';
import { useQuasar } from 'quasar';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { ref } from 'vue';

function authLogin() {
	return useMutation(() => PostsService.postsControllerCreate({ requestBody: form.value }));
}

const { isLoading, isError, error, isSuccess, mutate, data } = authLogin();

const form = ref({
	title: '',
	description: '',
	content: '',
	image: '',
	categories: [],
	tags: [],
	publicationStatus: 'draft',
	author: '',
	metaTags: [],
	// permalink: '',
});

const optionsCategories = ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'];

const optionsTags = ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'];
const optionPublicationStatus = ['draft', 'published'];
const optionMetaTags = ['fes', 'sport', 'hot'];

const onSubmit = () => {
	mutate(form.value);
};
</script>

<template>
	<h3 class="text-h3">Post create</h3>
	<pre>{{ data }}</pre>

	<div class="q-pa-md" style="max-width: 100%">
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
				v-model="form.categories"
				multiple
				:options="optionsCategories"
				label="Categories"
				class="q-mt-xl"
			/>

			<QSelect
				filled
				v-model="form.tags"
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

			<!-- <QInput
				filled
				v-model="form.permalink"
				label="Permalink"
				lazy-rules
				class="q-mt-xl"
				:readonly="true"
			/> -->

			<div class="q-my-xl">
				<QBtn label="Create" type="submit" color="primary" />
			</div>
		</QForm>
	</div>
</template>
