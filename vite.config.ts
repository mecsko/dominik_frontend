import { defineConfig } from "vite";
import { resolve } from "path";
import { quasar, transformAssetUrls } from "@quasar/vite-plugin";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
	plugins: [
		vue({
			template: { transformAssetUrls },
		}),
		quasar({
			autoImportComponentCase: "combined",
			sassVariables: "src/styles/quasar-variables.scss",
		}),
	],
	resolve: {
		alias: {
			"@api": resolve(__dirname, "src/api"),
			"@components": resolve(__dirname, "src/components"),
			"@interfaces": resolve(__dirname, "src/interfaces"),
			"@layouts": resolve(__dirname, "src/layouts"),
			"@stores": resolve(__dirname, "src/stores"),
			"@utils": resolve(__dirname, "src/utils"),
			"@views": resolve(__dirname, "src/views"),
		},
	},
	build: {
		chunkSizeWarningLimit: 1024,
		cssCodeSplit: true,
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes("/node_modules/")) {
						const modules = [
							"quasar",
							"@quasar",
							"vue",
							"@vue",
							"vue3-google-login",
							"axios",
							"pinia",
							"socket.io",
							"dayjs",
							"@intlify",
						];
						const chunk = modules.find((module) => id.includes(`/node_modules/${module}`));
						return chunk ? `vendor-${chunk}` : "vendor";
					}
				},
			},
		},
	},
});
