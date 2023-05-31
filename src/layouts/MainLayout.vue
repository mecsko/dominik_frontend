<template>
	<q-layout view="hHh lpR fFf">
		<q-header class="bg-primary text-white" data-cy="header">
			<q-toolbar>
				<q-toolbar-title>
					<q-btn rounded flat :to="{ name: 'home' }">BookSwap</q-btn>
				</q-toolbar-title>

				<div v-if="userStore.loggedInUser">
					<q-btn-dropdown flat rounded dense class="q-ml-sm" auto-close>
						<template #label>
							<ProfileAvatar
								title
								:src="userStore.loggedInUser.picture"
								data-cy="profilePicture"
								:alt="getDisplayName(userStore.loggedInUser)"
							/>
						</template>
						<q-list separator data-cy="profileMenu">
							<template v-for="button in buttons" :key="button.name">
								<q-item clickable class="flex-center" @click="button.action">
									<q-icon v-if="button.icon" :name="button.icon" size="sm" class="q-mr-sm" />
									<q-item-section>{{ button.name }}</q-item-section>
								</q-item>
							</template>
						</q-list>
					</q-btn-dropdown>
				</div>
				<div v-else>
					<q-btn flat :label="'login'" data-cy="openLoginButton" @click="appStore.login = true" />
					<q-btn flat :icon="darkModeButton.icon" data-cy="darkModeButton" @click="darkModeButton.action" />
				</div>
			</q-toolbar>
		</q-header>

		<q-page-container>
			<router-view />
		</q-page-container>

		<LoginModal v-if="appStore.login" />
		<RegisterModal v-if="appStore.register" />
	</q-layout>
</template>

<script setup lang="ts">
	import { computed, ComputedRef, ref } from "vue";
	import { useRouter } from "vue-router";
	import { useQuasar } from "quasar";
	import { useAppStore } from "@stores/app";
	import { useUserStore } from "@stores/user";
	import { useAuthStore } from "@stores/auth";
	import LoginModal from "@components/auth/LoginModal.vue";
	import RegisterModal from "@components/auth/RegisterModal.vue";
	import ProfileAvatar from "@components/ProfileAvatar.vue";
	import { getDisplayName } from "@utils/userHelper";
	import { mdiThemeLightDark } from "@quasar/extras/mdi-v7";
	import { matPerson, matLogout, matBook, matLibraryBooks } from "@quasar/extras/material-icons";

	const router = useRouter();
	const quasar = useQuasar();
	const appStore = useAppStore();
	const userStore = useUserStore();
	const authStore = useAuthStore();

	interface Button {
		name: string | ComputedRef<string>;
		action: () => void;
		icon?: string;
	}

	const darkModeButton: Button = {
		name: computed(() => (quasar.dark.isActive ? "title.lightMode" : "title.darkMode")),
		action: quasar.dark.toggle,
		icon: mdiThemeLightDark,
	};

	const buttons = ref<Button[]>([
		{
			name: computed(() => "me.profile"),
			action: () => router.push({ name: "myProfile" }),
			icon: matPerson,
		},
		{
			name: computed(() => "me.books"),
			action: () => router.push({ name: "myBooks" }),
			icon: matBook,
		},
		{
			name: computed(() => "me.swaps"),
			action: () => router.push({ name: "myBorrows" }),
			icon: matLibraryBooks,
		},
		darkModeButton,
		{
			name: computed(() => "auth.logout"),
			action: authStore.logOut,
			icon: matLogout,
		},
	]);
</script>

<style scoped></style>
