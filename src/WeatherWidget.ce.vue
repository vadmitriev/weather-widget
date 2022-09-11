<template>
  <div class="container">
    <weather v-if="!weatherStore.isSettingsOpen" />
    <settings v-if="weatherStore.isSettingsOpen" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Settings, Weather } from '@/views';

import { useWeatherStore } from './stores/weather';

export default defineComponent({
  name: 'weather-widget',
  components: { Weather, Settings },
  setup() {
    const weatherStore = useWeatherStore();

    return { weatherStore };
  },
});
</script>

<style lang="scss">
@import url('https: //fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Roboto', sans-serif;
}
</style>
