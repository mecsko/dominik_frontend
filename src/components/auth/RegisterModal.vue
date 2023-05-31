<template>
	<q-dialog v-model="appStore.register">
		<q-card
			:class="$q.dark.isActive ? 'bg-grey-10' : 'bg-grey-4'"
			style="min-width: 350px"
			data-cy="registerModal"
			class="q-pa-md"
		>
			<q-card-section class="row q-pt-none q-px-none">
				<div class="text-h4 q-pr-lg">{{ "auth.register" }}</div>
				<q-space />
				<q-btn v-close-popup :icon="matClose" flat round dense />
			</q-card-section>
			<q-separator class="q-mb-xs" />
			<q-form style="min-width: 300px" @submit.prevent="register">
				<q-input
					v-model="userCred.email"
					type="text"
					:label="'user.email' + ':'"
					lazy-rules
					reactive-rules
					data-cy="emailRegister"
					:rules="[(val) => isEmail.test(val) || 'formValidation.required']"
				/>
				<div class="row justify-between full-width" style="padding-bottom: 20px">
					<q-input v-model="name.firstName" :label="'user.firstName' + ':'" class="col" />
					<q-space class="col-1" />
					<q-input v-model="name.secondName" :label="'user.secondName' + ':'" class="col" />
				</div>
				<q-input
					v-model="userCred.username"
					type="text"
					:label="'user.username' + ':'"
					lazy-rules
					reactive-rules
					data-cy="usernameRegister"
					:rules="[(val) => !!val || 'formValidation.required']"
				/>
				<q-input
					v-model="userCred.password"
					type="password"
					:label="'user.password' + ':'"
					autocomplete="on"
					lazy-rules
					reactive-rules
					data-cy="passwordRegister"
					:rules="[(val) => !!val || 'formValidation.required']"
				/>

				<div class="q-gutter-md q-py-sm flex justify-evenly">
					<q-btn
						:color="$q.dark.isActive ? 'grey-5' : 'grey-8'"
						:text-color="$q.dark.isActive ? 'black' : 'grey-1'"
						:disabled="isDisabled"
						no-caps
						type="submit"
						:style="{ width: $q.screen.gt.xs ? 240 + 'px' : 140 + 'px' }"
						data-cy="registerButton"
						:label="'auth.register'"
					/>
					<q-btn
						:color="$q.dark.isActive ? 'grey-5' : 'grey-8'"
						:text-color="$q.dark.isActive ? 'black' : 'grey-1'"
						no-caps
						:label="'auth.goToLogin'"
						:style="{ width: $q.screen.gt.xs ? 240 + 'px' : 140 + 'px' }"
						data-cy="openLoginButton"
						@click="toLogin"
					/>
				</div>
			</q-form>
		</q-card>
	</q-dialog>
</template>

<script setup lang="ts">
	import { computed, reactive } from "vue";
	import { useAppStore } from "@stores/app";
	import { useAuthStore } from "@stores/auth";
	import { isEmail } from "@utils/validationHelper";
	import { matClose } from "@quasar/extras/material-icons";
	import type { RegisterCred } from "@interfaces/auth";
	import type { User } from "@interfaces/user";

	const appStore = useAppStore();
	const authStore = useAuthStore();

	const name = reactive({ firstName: "", secondName: "" });
	const userCred = reactive<RegisterCred>({ email: "", username: "", password: "" });

	async function register() {
		const final: Partial<User> = { ...userCred };
		if (userCred.picture) {
			final.picture = userCred.picture;
		}
		if (name.firstName?.length > 0 && name.secondName?.length > 0) {
			final.fullname = `${name.firstName} ${name.secondName}`;
		}

		await authStore.register(final);
		appStore.register = false;
	}

	function toLogin() {
		appStore.register = false;
		appStore.login = true;
	}

	const isDisabled = computed(() => {
		if (userCred["password"].length < 4 || userCred["email"].length < 4) {
			return true;
		} else return false;
	});
</script>

<style scoped></style>
