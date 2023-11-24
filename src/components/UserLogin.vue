<script setup lang="ts">
import { useQuery } from 'vue-query';
import { PagesService } from '@/http-client/services/PagesService';

const useTodosQuery = () => {
	return useQuery('todos', PagesService.pagesControllerFindAll);
};

const { isLoading, isError, data, error } = useTodosQuery();
</script>

<template>
	<form action="">
		<input type="text" />
		<input type="password" />

		<button type="submit">login</button>
	</form>

	<span v-if="isLoading">Loading...</span>
	<span v-else-if="isError">Error: {{ error.message }}</span>
	<!-- We can assume by this point that `isSuccess === true` -->
	<ul v-else>
		<li v-for="todo in data" :key="todo.id">{{ todo.title }}</li>
	</ul>
</template>
