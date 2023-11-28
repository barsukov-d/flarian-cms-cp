<script setup lang="ts">
import { ref } from 'vue';

const navMenuItems = ref([
	{
		name: 'Content',
		icon: 'content',
		link: '/content',
	},
	{
		name: 'Login',
		icon: 'login',
		link: '/login',
	},
	{
		name: 'Register',
		icon: 'person_add',
		link: '/register',
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
