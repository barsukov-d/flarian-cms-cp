<script setup lang="ts">
import { CategoriesService } from '@/http-client/services/CategoriesService';
import { ref, watch } from 'vue';
import { useMutation } from 'vue-query';
import { useRouter } from 'vue-router';

const form = ref({
	name: '',
});

function categoryCreate() {
	return useMutation(() =>
		CategoriesService.categoriesControllerCreate({ requestBody: form.value }),
	);
}

const { isLoading, isError, error, isSuccess, mutate, data } = categoryCreate();

const onSubmit = () => {
	mutate(form.value);
};

const router = useRouter();

watch(
	() => isSuccess,
	() => {
		if (isSuccess) {
			router.push({ name: 'categories' });
		}
	},
	{ deep: true },
);
</script>

<template>
	<h3 class="text-h3">Category create</h3>

	<div class="q-pa-md" style="max-width: 100%">
		<QForm @submit="onSubmit" class="q-gutter-md">
			<QInput
				filled
				v-model="form.name"
				label="Post title*"
				lazy-rules
				:rules="[(val) => (val && val.length > 0) || 'Please type something']"
			/>

			<div class="q-my-xl">
				<QBtn label="Create" type="submit" color="primary" />
			</div>
		</QForm>
	</div>
</template>
