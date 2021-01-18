import Toast from "./Toast";
import { createApp } from "vue";

export default {
  install: app => {
    const ToastApp = createApp(Toast);
    const toast = ToastApp.mount(document.createElement("div"));
    document.body.appendChild(toast.$el);
    app.config.globalProperties.$toast = toast;
  }
};
