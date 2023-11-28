<script setup lang="ts">
import { useMutation } from 'vue-query';
import { ref, watch } from 'vue';
import { AuthService, type AuthDto } from '@/http-client';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { OpenAPI } from '@/http-client';

const router = useRouter();

function authLogin() {
	return useMutation(() => AuthService.authControllerLogin({ requestBody: formData.value }));
}

const { isLoading, isError, error, isSuccess, mutate, data } = authLogin();

const $q = useQuasar();

const accept = ref(false);

const formData = ref<AuthDto>({
	login: '',
	password: '',
});

const onSubmit = () => {
	mutate(formData.value);
};

const onReset = () => {
	formData.value.login = '';
	formData.value.password = '';
	accept.value = false;
};

watch(isSuccess, (value) => {
	if (value) {
		$q.notify({
			message: 'Login success',
			type: 'positive',
			position: 'top',
			timeout: 1000,
		});
		console.log('isSuccess', value);

		router.push({ name: 'home' });
	}
});

watch(isError, (value) => {
	if (value) {
		$q.notify({
			message: 'Login error',
			type: 'negative',
			position: 'top',
			timeout: 1000,
		});
		console.log('isError', value);
	}
});

watch(data, (value) => {
	console.log(value, 'dataWatch');
	if (value.accessToken) {
		// localStorage.setItem('accessToken', value.accessToken);
		document.cookie = `jwtToken=${value.accessToken}; path=/;`;
		OpenAPI.TOKEN = value.accessToken || '123';
	}
});
</script>

<template>
	<div class="q-mb-xl q-pa-md" style="max-width: 400px">
		<h4 class="text-h4">Login</h4>
		<QForm @submit="onSubmit" @reset="onReset" class="q-gutter-md">
			<QInput
				filled
				v-model="formData.login"
				label="Your login *"
				hint="login and surlogin"
				lazy-rules
				:rules="[(val) => (val && val.length > 0) || 'Please type something']"
			/>

			<QInput
				filled
				type="password"
				v-model="formData.password"
				label="Your password *"
				lazy-rules
				:rules="[
					(val) => (val && val.length > 0) || 'Please type something',
					// (val) => (val !== null && val !== '') || 'Please type your age',
					// (val) => (val > 0 && val < 100) || 'Please type a real age',
				]"
			/>

			<div>
				<QBtn label="Submit" type="submit" color="primary" />
				<!-- <QBtn label="Reset" type="reset" color="primary" flat class="q-ml-sm" /> -->
			</div>
		</QForm>
	</div>
</template>
