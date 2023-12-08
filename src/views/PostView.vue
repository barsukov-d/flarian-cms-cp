<script setup lang="ts">
import { useGetPostById } from '@/hooks/useGetPostById';
const { data } = useGetPostById();
</script>

<template>
	<h3 class="text-h3">Post</h3>
	<pre>{{ data }}</pre>
	<div v-html="data?.content"></div>
</template>
