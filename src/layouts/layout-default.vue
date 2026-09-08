<script lang="ts" setup>
import { onMounted, ref } from 'vue';

import { RouterLink, RouterView } from 'vue-router';
import { useQuasar } from 'quasar';

import NavMenu from '@/components/NavMenu.vue';
import logo from '@/assets/logo.svg';

const leftDrawerOpen = ref(true);

const toggleLeftDrawer = () => {
	leftDrawerOpen.value = !leftDrawerOpen.value;
};

const $q = useQuasar();

const subscribeEmail = ref('');

const emailRules = [
	(val: string) => (val && val.length > 0) || 'Please type your email',
	(val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Please type a valid email',
];

const onSubscribeSubmit = () => {
	$q.notify({
		message: 'Subscribed successfully',
		type: 'positive',
		position: 'top',
		timeout: 1000,
	});

	subscribeEmail.value = '';
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

		<QFooter elevated class="bg-grey-8 text-white">
			<QToolbar>
				<QToolbarTitle>
					<RouterLink to="/">
						<QAvatar>
							<img :src="logo" />
						</QAvatar>
					</RouterLink>
				</QToolbarTitle>

				<QForm class="row items-start q-gutter-sm" @submit="onSubscribeSubmit">
					<QInput
						dark
						dense
						filled
						type="email"
						v-model="subscribeEmail"
						label="Subscribe to our newsletter"
						style="min-width: 260px"
						lazy-rules
						:rules="emailRules"
					/>

					<QBtn label="Subscribe" type="submit" color="primary" />
				</QForm>
			</QToolbar>
		</QFooter>
	</QLayout>
</template>
