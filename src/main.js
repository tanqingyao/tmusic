import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Toast from "components/common/toast";

const app = createApp(App);
app.use(router);
app.use(store);
app.use(Toast);
app.mount("#app");
