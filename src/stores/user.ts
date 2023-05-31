import { defineStore } from "pinia";
import { ref } from "vue";
import $axios from "@api/axios";
import { Loading } from "quasar";
import type { User, EditUser } from "@interfaces/user";

export const useUserStore = defineStore("user", () => {
	const loggedInUser = ref<User>();
	const openedUser = ref<User>();
	const openedNotification = ref<Notification | null>(null);

	async function getById(id: string) {
		try {
			Loading.show();
			const { data } = await $axios.get(`/user/${id}`);

			return data as User;
		} catch (error) {
			return;
		}
	}

	async function getLoggedIn() {
		try {
			Loading.show();
			const { data } = await $axios.get(`/user/me`);

			loggedInUser.value = data;
		} catch (error) {
			return;
		}
	}

	async function editLoggedIn(userData: EditUser) {
		try {
			Loading.show();
			const { data } = await $axios.patch(`/user/me`, userData);

			loggedInUser.value = data;
		} catch (error) {
			return;
		}
	}

	async function deleteLoggedIn() {
		try {
			Loading.show();
			await $axios.delete(`/user/me`);
		} catch (error) {
			return;
		}
	}

	return {
		loggedInUser,
		openedUser,
		openedNotification,
		getById,
		getLoggedIn,
		editLoggedIn,
		deleteLoggedIn,
	};
});
