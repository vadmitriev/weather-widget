
import { createApp, defineCustomElement, watch } from "vue";
import WeatherWidget from "./WeatherWidget.ce.vue";

import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const App = defineCustomElement(WeatherWidget);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);


createApp(App).use(pinia).mount("#app");
