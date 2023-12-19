<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useQuery } from 'vue-query';
import { TagsService } from '@/http-client/services/TagsService';
import type { QTableColumn } from 'quasar';
import { dateTransformer } from '@/shared/helpers/date-transformer';
import { QBtn, QTable } from 'quasar';

const router = useRouter();

const useTagsQuery = () => useQuery('posts', TagsService.tagsControllerFindAll);
const { isLoading, isError, data, error } = useTagsQuery();

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
		field: (row: any) => row.name,
		align: 'left',
	},
	{
		name: 'created_at',
		label: 'created',
		field: (row: any) => dateTransformer(row.createdAt),
		align: 'left',
	},
];
</script>

<template>
	<h3 class="text-h3">Tags</h3>
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

	<div v-if="isLoading">Loading...</div>
	<div v-else-if="error">An error occurred: {{ error.message }}</div>
	<div v-else>
		<QTable
			flat
			bordered
			title="Tags"
			:rows="data"
			:columns="columns"
			row-key="name"
			@row-click="
				(e, row, index) => {
					router.push({ name: 'tag', params: { id: row.id } });
				}
			"
		/>
	</div>
</template>
