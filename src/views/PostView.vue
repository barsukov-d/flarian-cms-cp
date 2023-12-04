<script setup lang="ts">
import { useQuery } from 'vue-query';
import { PostsService } from '@/http-client/services/PostsService';
import { useRoute } from 'vue-router';

import '@vueup/vue-quill/dist/vue-quill.snow.css';

const route = useRoute();

const usePostQuery = (id: string) =>
	useQuery(['post', id], () => PostsService.postsControllerFindOne({ id: id }));

const id = route.params.id as string;
const { isLoading, isError, data, error } = usePostQuery(id);
</script>

<template>
	<div>usePostQuery</div>
	<pre>{{ data }}</pre>
	<div v-html="data?.content"></div>
</template>
