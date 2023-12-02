<script setup lang="ts">
import { ref } from 'vue';

const navMenuItems = ref([
	{
		name: 'Posts',
		icon: 'posts',
		link: '/posts',
	},
	{
		name: 'Categories',
		icon: 'category',
		link: '/categories',
	},
	{
		name: 'Tags',
		icon: 'tag',
		link: '/tags',
	},
	{
		name: 'About',
		icon: 'info',
		link: '/about',
	},
]);
</script>
<template>
	<QList bordered separator>
		<QItem
			v-for="(item, index) in navMenuItems"
			:key="index"
			clickable
			v-ripple
			:to="item.link"
		>
			<QItemSection>{{ item.name }}</QItemSection>
		</QItem>
	</QList>
</template>
