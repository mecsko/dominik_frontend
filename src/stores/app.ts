import { ref } from "vue";
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", () => {
	const login = ref(false);
	const register = ref(false);
	const passwordReset = ref(false);

	return {
		login,
		register,
		passwordReset,
	};
});
