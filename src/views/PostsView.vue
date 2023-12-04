<script setup lang="ts">
import { useQuery } from 'vue-query';
import { PostsService } from '@/http-client/services/PostsService';
import { useRouter } from 'vue-router';

const router = useRouter();

const usePostsQuery = () => useQuery('posts', PostsService.postsControllerFindAll);

const { isLoading, isError, data, error } = usePostsQuery();

interface MyObject {
	/**
	 * Unique id, identifies column, (used by pagination.sortBy, 'body-cell-[name]' slot, ...)
	 */
	name: string;
	/**
	 * Label for header
	 */
	label: string;
	/**
	 * Row Object property to determine value for this column or function which maps to the required property
	 * @param row The current row being processed
	 * @returns Value for this column
	 */
	field: string | ((row: any) => any);
	/**
	 * If we use visible-columns, this col will always be visible
	 */
	required?: boolean;
	/**
	 * Horizontal alignment of cells in this column
	 * Default value: right
	 */
	align?: 'left' | 'right' | 'center';
	/**
	 * Tell QTable you want this column sortable
	 */
	sortable?: boolean;
	/**
	 * Compare function if you have some custom data or want a specific way to compare two rows; rows with null/undefined values will get sorted without triggering this method (use 'rawSort' instead if you want to handle those values too)
	 * @param a Value of the first comparison term
	 * @param b Value of the second comparison term
	 * @param rowA Full Row object in which is contained the first term
	 * @param rowB Full Row object in which is contained the second term
	 * @returns Comparison result of term 'a' with term 'b'. Less than 0 when 'a' should come first; greater than 0 if 'b' should come first; equal to 0 if their position must not be changed with respect to each other
	 */
	sort?: (a: any, b: any, rowA: any, rowB: any) => number;
	/**
	 * Compare function if you have some custom data or want a specific way to compare two rows; includes rows with null/undefined values (use 'sort' instead if you don't want that)
	 * @param a Value of the first comparison term
	 * @param b Value of the second comparison term
	 * @param rowA Full Row object in which is contained the first term
	 * @param rowB Full Row object in which is contained the second term
	 * @returns Comparison result of term 'a' with term 'b'. Less than 0 when 'a' should come first; greater than 0 if 'b' should come first; equal to 0 if their position must not be changed with respect to each other
	 */
	rawSort?: (a: any, b: any, rowA: any, rowB: any) => number;
	/**
	 * Set column sort order: 'ad' (ascending-descending) or 'da' (descending-ascending); Overrides the 'column-sort-order' prop
	 * Default value: ad
	 */
	sortOrder?: 'ad' | 'da';
	/**
	 * Function you can apply to format your data
	 * @param val Value of the cell
	 * @param row Full Row object in which the cell is contained
	 * @returns The resulting formatted value
	 */
	format?: (val: any, row: any) => any;
	/**
	 * Style to apply on normal cells of the column
	 * @param row The current row being processed
	 */
	style?: string | ((row: any) => string);
	/**
	 * Classes to add on normal cells of the column
	 * @param row The current row being processed
	 */
	classes?: string | ((row: any) => string);
	/**
	 * Style to apply on header cells of the column
	 */
	headerStyle?: string;
	/**
	 * Classes to add on header cells of the column
	 */
	headerClasses?: string;
}

const columns = [
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
] as MyObject[];

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
		<pre>{{ data }}</pre>
		<h3 class="text-h3">post page</h3>
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
