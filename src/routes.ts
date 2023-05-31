import { useUserStore } from "@stores/user";
import { useAuthStore } from "@stores/auth";
import type { RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
	{
		path: "/",
		component: () => import("@layouts/MainLayout.vue"),
		children: [
			{
				path: "",
				name: "home",
				component: () => import("@views/HomeView.vue"),
				beforeEnter: async (to) => {
					if (to.redirectedFrom?.name == "VerifyEmail") {
						const token = to.redirectedFrom?.query.token as string;
						const authStore = useAuthStore();
						await authStore.validateEmail(token);
					}
				},
			},
			{
				path: "user/:id",
				name: "userProfile",
				component: () => import("@views/UserProfileView.vue"),
				beforeEnter: async (to) => {
					const userStore = useUserStore();
					const user = await userStore.getById(to.params.id as string);
					if (user) {
						userStore.openedUser = user;
					}
				},
			},
		],
	},
	{
		path: "/:pathMatch(.*)*",
		name: "notfound",
		component: () => import("@views/404View.vue"),
	},
	{
		path: "/verify",
		name: "VerifyEmail",
		redirect: () => {
			return { name: "home", query: {} };
		},
	},
	{
		path: "/reset-password",
		name: "PasswordReset",
		component: () => import("@views/PasswordReset.vue"),
	},
];
