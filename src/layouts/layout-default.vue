<script lang="ts" setup>
import { onMounted, ref } from 'vue';

import { RouterLink, RouterView, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { OpenAPI } from '@/http-client';

import NavMenu from '@/components/NavMenu.vue';
import logo from '@/assets/logo.svg';

const leftDrawerOpen = ref(true);

const toggleLeftDrawer = () => {
	leftDrawerOpen.value = !leftDrawerOpen.value;
};

const $q = useQuasar();

const router = useRouter();

const goToProfile = () => {
	router.push('/profile');
};

const onLogout = () => {
	document.cookie = 'jwtToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
	OpenAPI.TOKEN = undefined;
	localStorage.removeItem('userEmail');
	router.push('/login');
};

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
						<img :src="logo" />
					</QAvatar>
					Flarian CMS
					<QBadge color="grey-8" class="q-ml-sm">v1.0</QBadge>
				</QToolbarTitle>

				<QSpace />

				<QBtn dense flat round icon="account_circle">
					<QMenu>
						<QList>
							<QItem clickable v-close-popup @click="goToProfile">
								<QItemSection>Profile</QItemSection>
							</QItem>
							<QItem clickable v-close-popup @click="onLogout">
								<QItemSection>Log out</QItemSection>
							</QItem>
						</QList>
					</QMenu>
				</QBtn>
			</QToolbar>
		</QHeader>

		<QDrawer v-model="leftDrawerOpen" side="left" bordered>
			<!-- drawer content -->
			<NavMenu />
		</QDrawer>

		<QPageContainer :style="'height: 100vh'">
			<RouterView />
		</QPageContainer>

		<QFooter elevated class="bg-grey-9 text-white">
			<div class="row items-stretch">
				<div class="col-12 col-sm-4">
					<QImg
						src="https://cdn.quasar.dev/img/parallax2.jpg"
						style="height: 220px"
						ratio="16/9"
					/>
				</div>

				<div class="col-12 col-sm-8 q-pa-lg">
					<div class="row items-center q-mb-md">
						<RouterLink to="/">
							<QAvatar size="40px" class="q-mr-sm">
								<img :src="logo" />
							</QAvatar>
						</RouterLink>
						<div class="text-h6">Title</div>
					</div>

					<div class="text-body2 q-mb-md" style="max-width: 480px">
						Stay up to date with our latest news — subscribe to our newsletter.
					</div>

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
				</div>
			</div>

			<QSeparator dark />

			<div class="row justify-center items-center q-pa-sm text-caption">Title — all rights reserved.</div>
		</QFooter>
	</QLayout>
</template>
