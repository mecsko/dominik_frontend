import { Quasar, QuasarPluginOptions, Dark, Notify, Loading } from "quasar";
import quasarIconSet from "quasar/icon-set/svg-material-icons";
import type { App } from "vue";

import "quasar/src/css/index.sass";

const config: Partial<QuasarPluginOptions> = {
	plugins: { Dark, Notify, Loading },
	iconSet: quasarIconSet,
	config: {
		eslint: {
			warnings: true,
			errors: true,
		},
		dark: true,
	},
	/*
    config: {
      brand: {
        // primary: '#e46262',
        // ... or all other brand colors
      },
      notify: {...}, // default set of options for Notify Quasar plugin
      loading: {...}, // default set of options for Loading Quasar plugin
      loadingBar: { ... }, // settings for LoadingBar Quasar plugin
      // ..and many more (check Installation card on each Quasar component/directive/plugin)
    }
  */
};

export const install = (app: App) => {
	app.use(Quasar, config);
};
