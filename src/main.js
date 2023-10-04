import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import BootstrapVue3 from "bootstrap-vue-3";
import Bar  from 'vue-chartjs'
import VueSweetalert2 from "vue-sweetalert2";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
import 'sweetalert2/dist/sweetalert2.min.css';


const app = createApp(App)
app.use(store)
app.use(VueSweetalert2)
app.use(router)
app.use(BootstrapVue3)
app.component('bar-chart', Bar)
app.mount('#app')
//createApp(App).use(store).use(router).mount('#app')
export const eventBus = createApp(App);