import './assets/main.css';

/* Import Bootstrap */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import router from './router';
// Import Pinia
import { createPinia } from 'pinia';

import { createApp } from 'vue';
import App from './App.vue';


const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);

app.mount('#app')
