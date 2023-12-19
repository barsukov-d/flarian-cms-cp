<script setup lang="ts">
import { type QTableColumn, QBtn, QTable } from 'quasar';
import { useQuery } from 'vue-query';
import { PostsService } from '@/http-client/services/PostsService';
import { useRouter } from 'vue-router';
import { watch } from 'vue';

import { dateTransformer } from '@/shared/helpers/date-transformer';

const router = useRouter();

const usePostsQuery = () => useQuery('posts', PostsService.postsControllerFindAll);

const { isLoading, data, error, isSuccess } = usePostsQuery();

const columns: QTableColumn[] = [
	{
		name: 'desc',
		label: 'id',
		field: (row: any) => row.id,
		align: 'left',
	},
	{
		name: 'strindfg',
		label: 'name',
		field: (row: any) => row.title,
		align: 'left',
	},
	{
		name: 'created_at',
		label: 'created',
		field: (row: any) => dateTransformer(row.createdAt),
		align: 'left',
	},
];

watch(
	() => isSuccess,
	() => {
		if (isSuccess) {
			// console.log(data.value, 'data-posts');
		}
	},
	{ deep: true },
);
</script>

<template>
	<div class="posts-page">
		<h3 class="text-h3">Posts</h3>
		<QBtn
			class="q-mb-xl"
			color="primary"
			label="Create post"
			@click="
				() => {
					router.push({ name: 'post-create' });
				}
			"
		/>
		<div v-if="isLoading">Loading...</div>
		<div v-else-if="error">An error occurred: {{ error.message }}</div>
		<div v-else>
			<QTable
				flat
				bordered
				title="Posts"
				:rows="data"
				:columns="columns"
				row-key="name"
				@row-click="
					(e, row, index) => {
						router.push({ name: 'post', params: { id: row.id } });
					}
				"
			/>
		</div>
	</div>
</template>
