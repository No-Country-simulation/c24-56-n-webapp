import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Debe coincidir con la carpeta y el archivo creados
import './styles/style.scss'; // Asegúrate de que el archivo de estilos existe
import '@mdi/font/css/materialdesignicons.min.css'

const app = createApp(App);
app.use(router);
app.mount('#app');
