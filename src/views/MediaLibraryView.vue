<script setup lang="ts">
import { ref, watch } from 'vue';
import { QFile, QIcon, QBtn } from 'quasar';
import { useMutation, useQuery, useQueryClient } from 'vue-query';
import { FilesService } from '@/http-client/services/FilesService';
import type { FilesUploadDto } from '@/http-client/models/FilesUploadDto';

const model = ref<FileList | null>(null);

let filesUpload: FilesUploadDto = {
	files: [],
};

watch(model, () => {
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

watch(uploadFiles.isSuccess, () => {
	if (uploadFiles.isSuccess.value) {
		queryClient.invalidateQueries('images');
	}
});

const imagesQuery = useQuery('images', FilesService.filesControllerGetAllFilesByWebP);

export type SelectedImages = {
	id: string;
	name: string;
	url: string;
	checkChoose: boolean;
	fileUuid: string;
};

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

const checkChoose = (id: string) => {
	return !!selectedImages.value.find((item) => item.id === id);
};

const dataImages = ref<SelectedImages[]>([]);

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

const removeFile = useMutation((fileUuid: string) =>
	FilesService.filesControllerRemove({ id: fileUuid }),
);

const handlerFileRemove = (fileUuid: string) => {
	removeFile.mutate(fileUuid);
};

const queryClient = useQueryClient();

watch(removeFile.isSuccess, () => {
	if (removeFile.isSuccess.value) {
		queryClient.invalidateQueries('images');
	}
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
				@click="onSelected(item.id, item.name, item.url, item.fileUuid)"
			/>
			<span>Choose</span>
			<span>{{ item.name }}</span>
			<span>/</span>
			<span>{{ item.name }}</span>
			<QBtn color="primary" label="Delete" @click="handlerFileRemove(item.fileUuid)"></QBtn>
			<img style="display: block" :src="`http://localhost:3031/static/${item.url}`" alt="" />
		</div>
	</div>
</template>
