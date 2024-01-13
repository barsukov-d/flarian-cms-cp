<script setup lang="ts">
import type { CreatePostDto } from '@/http-client/models/CreatePostDto';
import { onMounted, ref, watch, watchEffect } from 'vue';
import { QuillEditor } from '@vueup/vue-quill';

import { useMutation, useQuery, useQueryClient } from 'vue-query';
import type { SelectedImages } from '@/views/MediaLibraryView.vue';
import { FilesService } from '@/http-client/services/FilesService';

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

const selectedImages = ref<SelectedImages[]>([]);

const onSelected = (id: string, name: string, url: string, fileUuid: string) => {
	if (selectedImages.value.find((item) => item.id === id)) {
		selectedImages.value = selectedImages.value.filter((item) => item.id !== id);
		return;
	}
	selectedImages.value.push({
		id,
		name,
		url,
		checkChoose: true,
		fileUuid,
	});
};

const dataImages = ref<SelectedImages[]>([]);

const imagesQuery = useQuery('images', FilesService.filesControllerGetAllFilesByWebP);

const checkChoose = (id: string) => {
	return !!selectedImages.value.find((item) => item.id === id);
};

const handlerSelectImage = (url: string) => {
	formModel.value.image = url;
};

watch(imagesQuery.data, () => {
	if (!imagesQuery.data.value) return;

	dataImages.value = imagesQuery.data.value.map((item: any) => {
		return {
			id: item.id,
			name: item.name,
			url: item.url,
			checkChoose: checkChoose(item.id),
			fileUuid: item.fileUuid,
		};
	});
});

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
				<h6 class="text-h6 q-my-sm">Selected Image</h6>

				<QImg
					:src="`http://localhost:3031/static/${formModel.image}`"
					spinner-color="white"
					style="height: 200px; max-width: 200px"
					fit="contain"
				/>

				<h6 class="text-h6 q-my-sm">Image List</h6>

				<div v-for="(item, index) in dataImages" :key="index">
					<span>{{ item.id }}</span>
					/
					<span>{{ item.name }}</span>

					<QBtn
						color="primary"
						label="Select"
						@click="handlerSelectImage(item.url)"
						class="q-ml-md"
					></QBtn>
					<QImg
						:src="`http://localhost:3031/static/${item.url}`"
						spinner-color="white"
						style="height: 200px; max-width: 200px; display: block"
						fit="contain"
					/>
				</div>
			</div>

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
