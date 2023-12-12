<script setup lang="ts">
import { useMutation } from 'vue-query';
import { TagsService } from '@/http-client/services/TagsService';
import { ref } from 'vue';

const form = ref({
	name: '',
});

const tagCreate = useMutation(() => TagsService.tagsControllerCreate({ requestBody: form.value }));

const onSubmit = () => {
	tagCreate.mutate(form.value);
};
</script>

<template>
	<div>tag create page</div>

	<div class="q-pa-md" style="max-width: 100%">
		<QForm @submit="onSubmit" class="q-gutter-md">
			<QInput
				filled
				v-model="form.name"
				label="Tag name*"
				lazy-rules
				:rules="[(val) => (val && val.length > 0) || 'Please type something']"
			/>

			<div class="q-my-xl">
				<QBtn label="Create" type="submit" color="primary" />
			</div>
		</QForm>
	</div>
</template>
