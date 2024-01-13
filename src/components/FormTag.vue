<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
	form?: {
		name: string;
	};
	isSuccess?: boolean;
	buttonName?: string;
}>();

const emit = defineEmits<{
	(e: 'submit', requestData: any): void;
}>();

const formModel = ref({
	name: '',
});

watch(
	() => props.form,
	() => {
		if (!props.form) return;
		formModel.value.name = props.form.name;
	},
	{ deep: true, immediate: true },
);

const onSubmit = () => {
	emit('submit', formModel.value);
};
</script>

<template>
	<div style="max-width: 100%">
		<QForm @submit="onSubmit" class="q-gutter-md">
			<QInput
				filled
				v-model="formModel.name"
				label="Tag title*"
				lazy-rules
				:rules="[(val) => (val && val.length > 0) || 'Please type something']"
			/>

			<div class="q-my-xl">
				<QBtn :label="props.buttonName" type="submit" color="primary" />
			</div>
		</QForm>
	</div>
</template>
