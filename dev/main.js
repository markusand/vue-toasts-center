import { createApp } from 'vue';
import App from './App.vue';
import Toasts from '../src';

const app = createApp(App);
app.use(Toasts, {
  timeout: 5000,
  closeable: true,
});
app.mount('#app');
