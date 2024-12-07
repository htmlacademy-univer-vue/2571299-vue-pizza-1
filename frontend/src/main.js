import { createApp } from "vue";
import { createPinia } from "pinia";
import { useUserStore } from "./stores/user";
import { getToken, removeToken } from "./services/token-manager";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");

// Проверяем, если пользователь уже вошёл в систему
const token = getToken();
if (token) {
  try {
    const authStore = useUserStore();
    await authStore.getMe();
    await router.push({ name: "home" });
  } catch (e) {
    removeToken();
    console.log(e);
  }
}
