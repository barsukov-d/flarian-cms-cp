import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import { VueQueryPlugin } from 'vue-query';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueQueryPlugin);

app.mount('#app');

import { OpenAPI } from '@/http-client';

OpenAPI.BASE = 'http://localhost:3031/api';
