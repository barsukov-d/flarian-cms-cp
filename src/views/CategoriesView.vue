<script setup lang="ts">
import { CategoriesService } from '@/http-client';
import { useQuery } from 'vue-query';
import { useRouter } from 'vue-router';
import { QBtn, QTable } from 'quasar';
import type { QTableColumn } from 'quasar';

import { dateTransformer } from '@/shared/helpers/date-transformer';

const router = useRouter();

function useCategoriesQuery() {
	return useQuery('posts', CategoriesService.categoriesControllerFindAll);
}

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

const { isLoading, isError, data, error } = useCategoriesQuery();
</script>

<template>
	<h3 class="h3-text">Categories</h3>

	<QBtn
		class="q-mb-xl"
		color="primary"
		label="Create category"
		@click="
			() => {
				router.push({ name: 'category-create' });
			}
		"
	/>

	<div v-if="isLoading">Loading...</div>
	<div v-else-if="error">An error occurred: {{ error.message }}</div>
	<div v-else>
		<QTable
			flat
			bordered
			title="Categories"
			:rows="data"
			:columns="columns"
			row-key="name"
			@row-click="
				(e, row, index) => {
					router.push({ name: 'category', params: { id: row.id } });
				}
			"
		/>
	</div>
</template>
