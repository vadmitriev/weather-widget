<template>
  <div class="container">
    <my-card>
      <div class="header">
        <weather-header
          :showSettings="store.isSettingsOpen"
          @click="store.toggleSettings"
          v-show="store.cities.length > 0"
        />
      </div>
      <settings v-if="store.isSettingsOpen" />
      <weather v-else />
      <div class="loader-wrapper">
        <my-loader v-show="store.isLoading" :visible="store.isLoading" />
      </div>
      <div class="error-wrapper">
        <error-component
          v-if="store.error !== null" :error="store.error ?? ''"
        />
      </div>
    </my-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Settings, Weather } from '@/views';

import {
  WeatherHeader, ErrorComponent,
} from '@/components';
import { useWeatherStore } from '@/stores/weather';
import { saveToLocalStorage } from '@/helpers';
import { LS_WEATHER_STATE } from '@/constants';

export default defineComponent({
  name: 'weather-widget',
  components: {
    Weather,
    Settings,
    WeatherHeader,
    ErrorComponent,

  },
  setup() {
    const store = useWeatherStore();

    store.$subscribe((_, state) => {
      saveToLocalStorage(LS_WEATHER_STATE, state);
    });

    return { store };
  },
});
</script>

<style lang="scss">
@import './WeatherWidget.scss'
</style>
