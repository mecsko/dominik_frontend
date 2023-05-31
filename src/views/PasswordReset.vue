<template>
	<div
		style="height: 100vh"
		class="flex justify-center items-center"
		:class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-4'"
	>
		<q-card
			style="min-width: 400px; max-width: 500px"
			class="q-pa-lg"
			:class="$q.dark.isActive ? 'bg-grey-10' : 'bg-grey-4'"
		>
			<q-card-section class="row q-pt-none q-px-none">
				<div class="text-h4 q-pr-lg">Send new password</div>
			</q-card-section>
			<q-separator />
			<q-form @submit="sendNewPassword">
				<q-input v-model="oldPassword" type="password" :label="'old password'" />
				<q-input v-model="newPassword" type="password" :label="'new password'" />
				<q-input v-model="temp" type="password" :label="'new password again'" />
				<q-btn
					class="q-mt-lg q-py-sm"
					type="submit"
					:color="$q.dark.isActive ? 'grey-5' : 'grey-8'"
					:text-color="$q.dark.isActive ? 'black' : 'grey-1'"
					no-caps
					:label="'send'"
				/>
			</q-form>
		</q-card>
	</div>
</template>

<script setup lang="ts">
	import { ref } from "vue";
	import { useRoute, useRouter } from "vue-router";
	import { useAuthStore } from "@stores/auth";

	const route = useRoute();
	const router = useRouter();
	const authStore = useAuthStore();

	const oldPassword = ref("");
	const newPassword = ref("");
	const temp = ref("");

	async function sendNewPassword() {
		if (newPassword.value != temp.value) {
			return;
		}
		await authStore.resetPassword(route.query.token as string, oldPassword.value, newPassword.value);
		await router.push("/");
	}
</script>

<style scoped></style>
