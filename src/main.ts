import { createApp, defineCustomElement } from 'vue';

import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import WeatherWidget from './WeatherWidget.ce.vue';

const App = defineCustomElement(WeatherWidget);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

createApp(App).use(pinia).mount('#app');
