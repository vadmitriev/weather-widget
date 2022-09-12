import { createApp, defineCustomElement } from 'vue';
import { createPinia } from 'pinia';
import { WeatherWidget } from './widgets';

const App = defineCustomElement(WeatherWidget);

const pinia = createPinia();

const app = createApp(WeatherWidget);

app.use(pinia);
customElements.define('weather-widget', App);
