<script setup lang="ts">
import { ref, watch } from 'vue';
import { QFile, QIcon } from 'quasar';
import { useMutation, useQuery } from 'vue-query';
import { FilesService } from '@/http-client/services/FilesService';
import type { FilesUploadDto } from '@/http-client/models/FilesUploadDto';
const model = ref<FileList | null>(null);

let filesUpload: FilesUploadDto = {
	files: [],
};

watch(model, (value) => {
	if (!model.value) return;

	const files: Array<Blob> = Array.from(model.value).map((file) => {
		return file;
	});

	filesUpload = { files };
});

const uploadFiles = useMutation(() =>
	FilesService.filesControllerUploadFile({ formData: filesUpload }),
);

const onSubmit = () => {
	uploadFiles.mutate();
};

const { data, isLoading, isError, error } = useQuery(
	'inages',
	FilesService.filesControllerGetAllFilesByWebP,
);

export type SelectedImages = {
	id: string;
	name: string;
	url: string;
	checkChoose: boolean;
};

const selectedImages = ref<SelectedImages[]>([]);

const onSelected = (id: string, name: string, url: string) => {
	if (selectedImages.value.find((item) => item.id === id)) {
		selectedImages.value = selectedImages.value.filter((item) => item.id !== id);
		return;
	}
	selectedImages.value.push({
		id,
		name,
		url,
		checkChoose: true,
	});
};

const checkChoose = (id: string) => {
	return !!selectedImages.value.find((item) => item.id === id);
};

const dataImages = ref<SelectedImages[]>([]);

watch(data, () => {
	if (!data.value) return;

	dataImages.value = data.value.map((item: any) => {
		return {
			id: item.id,
			name: item.name,
			url: item.url,
			checkChoose: checkChoose(item.id),
		};
	});
});
</script>

<template>
	<div class="about">
		<h3 class="text-h3">Media library</h3>
		<QFile color="teal" filled v-model="model" label="Label" :multiple="true">
			<template v-slot:prepend>
				<QIcon name="cloud_upload" />
			</template>
		</QFile>

		<QBtn class="q-mt-xl" label="Upload" color="primary" @click="onSubmit" />

		<div v-for="(item, index) in dataImages" :key="index">
			<span>{{ item.id }}</span>
			<QCheckbox
				v-model="item.checkChoose"
				@click="onSelected(item.id, item.name, item.url)"
			/>
			<span>Choose</span>
			<span>{{ item.name }}</span>
			<span>/</span>
			<span>{{ item.name }}</span>
			<img style="display: block" :src="`http://localhost:3031/static/${item.url}`" alt="" />
		</div>

		<pre>{{ data }}</pre>
	</div>
</template>
