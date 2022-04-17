import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/global.scss";

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const options = {
 // You can set your default options here
 position: 'top-center',
 timeout: 2000,
 closeOnClick: true,
 pauseOnFocusLoss: true,
 pauseOnHover: true,
 draggable: true,
 draggablePercent: 0.6,
 showCloseButtonOnHover: false,
 hideProgressBar: true,
 closeButton: 'button',
 icon: true,
 rtl: false,
 transition: 'Vue-Toastification__bounce',
 maxToasts: 20,
 newestOnTop: true,
};

const app = createApp(App)
app.use(store)
app.use(router)
app.use(Toast, options)
app.mount("#app");