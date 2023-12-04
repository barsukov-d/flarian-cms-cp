<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useQuery } from 'vue-query';
import { TagsService } from '@/http-client/services/TagsService';

const router = useRouter();

const useTagsQuery = () => useQuery('posts', TagsService.tagsControllerFindAll);
const { isLoading, isError, data, error } = useTagsQuery();
</script>

<template>
	<div>
		<h3 class="text-h3">Tags</h3>
		<pre>{{ data }}</pre>
		<QBtn
			class="q-mb-xl"
			color="primary"
			label="Create tag"
			@click="
				() => {
					router.push({ name: 'tag-create' });
				}
			"
		/>
	</div>
</template>
