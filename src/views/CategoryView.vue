<script setup lang="ts">
import { CategoriesService, type UpdateCategoryDto } from '@/http-client';
import { ref, watch } from 'vue';
import { useMutation } from 'vue-query';
import FormCategory from '@/components/FormCategory.vue';
import { useRoute } from 'vue-router';
// import { useQuasar } from 'quasar';
import { useGetCategoryById } from '@/hooks/useGetCategoryById';

// const $q = useQuasar();

const formData = ref({
	name: '',
});

const requestData: UpdateCategoryDto = {
	name: '',
};

const prepareData = (data: any) => {
	requestData.name = data.name;
};

const { data } = useGetCategoryById();

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
	CategoriesService.categoriesControllerUpdate({
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
	<h3 class="text-h3">Category</h3>

	<FormCategory :form="formData" @submit="onSubmit" :buttonName="'Update'" />

	<!-- <QBtn class="q-mb-xl" color="negative" label="Delete" @click="handleDeleteCategory"> </QBtn> -->
</template>
