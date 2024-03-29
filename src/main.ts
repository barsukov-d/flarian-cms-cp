import './assets/main.css';

import { createApp } from 'vue';
import { Quasar, Notify, Dialog } from 'quasar';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import { VueQueryPlugin } from 'vue-query';

// Import icon libraries
import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/material-icons/material-icons.css';

// Import Quasar css
import 'quasar/src/css/index.sass';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueQueryPlugin);
app.use(Quasar, {
	plugins: {
		Notify,
		Dialog,
	}, // import Quasar plugins and add here

	config: {
		// brand: {
		// primary: '#e46262',
		// ... or all other brand colors
		// },
		notify: {}, // default set of options for Notify Quasar plugin
		// loading: {...}, // default set of options for Loading Quasar plugin
		// loadingBar: { ... }, // settings for LoadingBar Quasar plugin
		// ..and many more (check Installation card on each Quasar component/directive/plugin)
	},
});

app.mount('#app');

import { OpenAPI } from '@/http-client';

OpenAPI.BASE = 'http://sky-web.site:3031/api';

// const jwtToken = document.cookie.replace(/(?:(?:^|.*;\s*)jwtToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
// OpenAPI.TOKEN = jwtToken;
