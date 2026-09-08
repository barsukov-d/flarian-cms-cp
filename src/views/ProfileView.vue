<script setup lang="ts">
import { ref } from 'vue';

const email = ref(localStorage.getItem('userEmail') ?? '');

const roles = ref(['admin']);
</script>

<template>
	<div class="q-pa-md" style="max-width: 480px">
		<h3 class="text-h3">Profile</h3>

		<div class="q-mb-lg">
			<div class="text-subtitle2">Email</div>
			<div class="text-body1">{{ email }}</div>
		</div>

		<div>
			<div class="text-subtitle2">Roles (placeholder — roles are not implemented on the backend yet)</div>
			<QList bordered separator>
				<QItem v-for="(role, index) in roles" :key="index">
					<QItemSection>{{ role }}</QItemSection>
				</QItem>
			</QList>
		</div>
	</div>
</template>
