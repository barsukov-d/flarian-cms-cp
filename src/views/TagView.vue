<script setup lang="ts">
import { useGetTagById } from '@/hooks/useGetTagById';
import { TagsService } from '@/http-client';
import type { UpdateTagDto } from '@/http-client/models/UpdateTagDto';
import { ref, watch } from 'vue';
import { useMutation } from 'vue-query';
import { useRoute } from 'vue-router';

import FormTag from '@/components/FormTag.vue';

const formData = ref({
	name: '',
});

const requestData: UpdateTagDto = {
	name: '',
};

const prepareData = (data: any) => {
	requestData.name = data.name;
};

const { data } = useGetTagById();

watch(
	() => data.value,
	() => {
		if (data.value) {
			formData.value.name = data.value.name;
		}
	},
	{ deep: true, immediate: true },
);

const categoryUpdate = useMutation(() =>
	TagsService.tagsControllerUpdate({
		id: route.params.id as string,
		requestBody: requestData,
	}),
);

const { mutate } = categoryUpdate;

const onSubmit = (dataEmit: any) => {
	prepareData(dataEmit);
	console.log(dataEmit, 'onSubmit');

	mutate({
		id: route.params.id as string,
		requestBody: dataEmit.name,
	});
};

const route = useRoute();

// const handleDeleteCategory = () => {
// 	$q.dialog({
// 		title: 'Confirm',
// 		message: 'Would you like to delete post?',
// 		cancel: true,
// 		persistent: true,
// 	})
// 		.onOk(() => {
// 			CategoriesService.categoriesControllerRemove({ id: route.params.id as string });
// 		})
// 		.onCancel(() => {
// 			// console.log('>>>> Cancel')
// 		})
// 		.onDismiss(() => {
// 			// console.log('I am triggered on both OK and Cancel')
// 		});
// };
</script>

<template>
	<h3>Tag page</h3>

	<FormTag :form="formData" @submit="onSubmit" :buttonName="'Update'" />
</template>
