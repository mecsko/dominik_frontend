import axios from "axios";
import { Notify } from "quasar";
import { matClose } from "@quasar/extras/material-icons";

Notify.setDefaults({
	progress: true,
	position: "bottom-right",
	timeout: 2000,
	actions: [{ icon: matClose, color: "white" }],
});

const $axios = axios.create({
	baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
	withCredentials: true,
});

export default $axios;
