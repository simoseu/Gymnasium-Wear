import './assets/main.css';

/* Import Bootstrap */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import router from './router';

import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

app.use(router);

app.mount('#app')
