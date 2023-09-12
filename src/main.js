import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import './assets/main.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';
createApp(App).use(router).use(VueToast).use(router).mount('#app')
