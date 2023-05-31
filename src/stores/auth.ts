import $axios from "@api/axios";
import { Loading, Notify, LocalStorage } from "quasar";
import { defineStore } from "pinia";
import { useUserStore } from "./user";
import { router } from "../modules/router";
import { isEmail } from "@utils/validationHelper";
import type { LoginCred } from "@interfaces/auth";
import type { User } from "@interfaces/user";

export const useAuthStore = defineStore("auth", () => {
	async function checkValidUser() {
		try {
			Loading.show();
			const { data } = await $axios.get("/auth");
			saveUserData(data);
		} catch (error) {
			LocalStorage.remove("user_id");
			await router.push({ name: "home" });
		}
	}

	function saveUserData(user: User) {
		const userStore = useUserStore();
		LocalStorage.set("user_id", user._id as string);

		userStore.loggedInUser = user;
	}

	async function login(userData: LoginCred) {
		const loginData: { email?: string; username?: string; password: string } = { password: userData.password };
		if (isEmail.test(userData.emailOrUsername)) {
			loginData.email = userData.emailOrUsername;
		} else {
			loginData.username = userData.emailOrUsername;
		}
		try {
			Loading.show();
			const { data } = await $axios.post("/auth/login", loginData);
			saveUserData(data);
			await router.push({ name: "home" });
		} catch (error) {
			return;
		}
	}

	async function register(userData: Partial<User>) {
		try {
			Loading.show();
			const { status } = await $axios.post("/auth/register", userData);
			if (status < 400) {
				Notify.create({ message: "E-mail has been sent. Check you incoming e-mails" });
			}
		} catch (error) {
			return;
		}
	}

	async function validateEmail(token: string) {
		try {
			const { status, data } = await $axios.get(`/auth/verify-email?token=${token}`);
			if (status < 400) {
				Notify.create({ message: data });
			}
		} catch (error) {
			return;
		}
	}

	async function sendResetPasswordRequest(email: string) {
		try {
			if (!isEmail.test(email)) {
				return;
			}
			const { status, data } = await $axios.post("/auth/forgot-password", { email });
			if (status < 400) {
				Notify.create({ message: data });
			}
		} catch (error) {
			return;
		}
	}

	async function resetPassword(token: string, oldPassword: string, newPassword: string) {
		try {
			const { status, data } = await $axios.post("/auth/reset-password", { token, oldPassword, newPassword });
			if (status < 400) {
				Notify.create({ message: data });
			}
		} catch (error) {
			return;
		}
	}

	async function logOut() {
		try {
			Loading.show();
			await $axios.get("/auth/logout");
			LocalStorage.remove("user_id");
			const userStore = useUserStore();
			userStore.loggedInUser = undefined;
			await router.push({ name: "home" });
		} catch (error) {
			return;
		}
	}

	return {
		login,
		register,
		validateEmail,
		sendResetPasswordRequest,
		resetPassword,
		logOut,
		checkValidUser,
	};
});
