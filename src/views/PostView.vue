<script setup lang="ts">
import { useQuery } from 'vue-query';
import { PostsService } from '@/http-client/services/PostsService';
import { useRoute } from 'vue-router';

import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const route = useRoute();

function usePostQuery(id: string) {
	return useQuery(['post', id], () => PostsService.postsControllerFindOne({ id: id }));
}

const id = route.params.id as string;
const { isLoading, isError, data, error } = usePostQuery(id);
</script>

<template>
	<div>usePostQuery</div>
	<pre>{{ data }}</pre>
	<div v-html="data.content"></div>
</template>
