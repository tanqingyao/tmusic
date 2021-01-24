import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Toast from "components/common/toast";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faSearch, faTimes);

const app = createApp(App);
app.use(router);
app.use(store);
app.use(Toast);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
