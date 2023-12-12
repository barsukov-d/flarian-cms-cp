<script setup lang="ts">
import { CategoriesService } from '@/http-client';
import { useQuery } from 'vue-query';
import { useRouter } from 'vue-router';

const router = useRouter();

function usePostsQuery() {
	return useQuery('posts', CategoriesService.categoriesControllerFindAll);
}

const { isLoading, isError, data, error } = usePostsQuery();
</script>

<template>
	<div>categories page</div>

	<pre>{{ data }}</pre>

	<QBtn
		class="q-mt-xl"
		color="primary"
		label="Create category"
		@click="
			() => {
				router.push({ name: 'category-create' });
			}
		"
	/>
</template>
