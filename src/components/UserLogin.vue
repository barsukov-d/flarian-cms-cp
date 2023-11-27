<script setup lang="ts">
import { useMutation } from 'vue-query';
import { ref } from 'vue';
import { AuthService, type AuthDto } from '@/http-client';

const formData = ref<AuthDto>({
	login: '',
	password: '',
});

function authLogin() {
	return useMutation(() => AuthService.authControllerLogin({ requestBody: formData.value }));
}

const onSubmit = () => {
	mutate(formData.value);
};

const { isLoading, isError, error, isSuccess, mutate } = authLogin();
</script>

<template>
	<form action="" @submit.prevent="onSubmit">
		<input type="text" v-model="formData.login" />
		<input type="password" v-model="formData.password" />

		<button type="submit">login</button>
	</form>
</template>
