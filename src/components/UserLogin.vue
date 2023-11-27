<script setup lang="ts">
import { useMutation } from 'vue-query';
import { ref } from 'vue';
import { AuthService, type AuthDto } from '@/http-client';
import { useQuasar } from 'quasar';

const formData = ref<AuthDto>({
	login: '',
	password: '',
});

function authLogin() {
	return useMutation(() => AuthService.authControllerLogin({ requestBody: formData.value }));
}

// const onSubmit = () => {
// 	mutate(formData.value);
// };

const { isLoading, isError, error, isSuccess, mutate } = authLogin();

const $q = useQuasar();

const name = ref(null);
const age = ref(null);
const accept = ref(false);

const onSubmit = () => {
	if (accept.value !== true) {
		$q.notify({
			color: 'red-5',
			textColor: 'white',
			icon: 'warning',
			message: 'You need to accept the license and terms first',
		});
	} else {
		$q.notify({
			color: 'green-4',
			textColor: 'white',
			icon: 'cloud_done',
			message: 'Submitted',
		});
	}
};

const onReset = () => {
	name.value = null;
	age.value = null;
	accept.value = false;
};
</script>

<!-- <template>
	<form action="" @submit.prevent="onSubmit">
		<input type="text" v-model="formData.login" />
		<input type="password" v-model="formData.password" />

		<QBtn color="white" text-color="black" label="login" type="submit" />
	</form>
</template> -->

<template>
	<div class="q-pa-md" style="max-width: 400px">
		<QForm @submit="onSubmit" @reset="onReset" class="q-gutter-md">
			<QInput
				filled
				v-model="name"
				label="Your name *"
				hint="Name and surname"
				lazy-rules
				:rules="[(val) => (val && val.length > 0) || 'Please type something']"
			/>

			<QInput
				filled
				type="number"
				v-model="age"
				label="Your age *"
				lazy-rules
				:rules="[
					(val) => (val !== null && val !== '') || 'Please type your age',
					(val) => (val > 0 && val < 100) || 'Please type a real age',
				]"
			/>

			<QToggle v-model="accept" label="I accept the license and terms" />

			<div>
				<QBtn label="Submit" type="submit" color="primary" />
				<QBtn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
			</div>
		</QForm>
	</div>
</template>
