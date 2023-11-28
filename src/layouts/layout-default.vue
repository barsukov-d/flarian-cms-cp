<script lang="ts" setup>
import { onMounted, ref } from 'vue';

import { RouterView } from 'vue-router';

import NavMenu from '@/components/NavMenu.vue';

const leftDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
	leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>

<template>
	<QLayout view="hHh lpR fff">
		<QHeader elevated class="bg-primary text-white">
			<QToolbar>
				<QBtn dense flat round icon="menu" @click="toggleLeftDrawer" />

				<QToolbarTitle>
					<QAvatar>
						<img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
					</QAvatar>
					Title
				</QToolbarTitle>
			</QToolbar>
		</QHeader>

		<QDrawer v-model="leftDrawerOpen" side="left" bordered>
			<!-- drawer content -->
			<NavMenu />
		</QDrawer>

		<QPageContainer :style="'height: 100vh'">
			<RouterView />
		</QPageContainer>

		<!-- <QFooter elevated class="bg-grey-8 text-white">
			<QToolbar>
				<QToolbarTitle>
					<QAvatar>
						<img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
					</QAvatar>
				</QToolbarTitle>
			</QToolbar>
		</QFooter> -->
	</QLayout>
</template>
