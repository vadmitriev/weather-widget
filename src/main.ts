import { createApp, defineCustomElement } from 'vue';
import components from '@/components/UI';
import { createPinia } from 'pinia';
import { WeatherWidget } from './widgets';

// const App = defineCustomElement(WeatherWidget);

const pinia = createPinia();

const app = createApp(WeatherWidget);

components.forEach((component) => app.component(component.name, component));

app.use(pinia).mount('#app');
// customElements.define('weather-widget', App);
