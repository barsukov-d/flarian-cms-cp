<script setup lang="ts">
import { type QTableColumn } from 'quasar';
import { useQuery } from 'vue-query';
import { PostsService } from '@/http-client/services/PostsService';
import { useRouter } from 'vue-router';

const router = useRouter();

const usePostsQuery = () => useQuery('posts', PostsService.postsControllerFindAll);

const { isLoading, isError, data, error } = usePostsQuery();

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

const dateTransformer = (isoDate: string) => {
	const date = new Date(isoDate);

	const year = date.getFullYear();
	const month = date.getMonth() + 1; // Months are 0-indexed in JavaScript
	const day = date.getDate();
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();

	const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}`;

	return formattedDate;
};
</script>

<template>
	<div class="posts-page">
		<h3 class="text-h3">posts</h3>
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
						console.log('row-click', e, row, index);
						router.push({ name: 'post', params: { id: row.id } });
					}
				"
			/>
		</div>
	</div>
</template>
