<template>
  <div class="weather-widget">
    <my-card>
      <div class="weather-widget__header">
        <weather-header
          :showSettings="store.isSettingsOpen"
          @click="toggleSettings"
        />
      </div>
      <settings v-show="store.isSettingsOpen" />
      <weather v-show="!store.isSettingsOpen" />
      <div class="weather-widget__loader-wrapper">
        <my-loader
          v-show="store.isLoading"
          :visible="store.isLoading"
        />
      </div>
      <div class="weather-widget__error-wrapper">
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
import { MyCard, MyLoader } from '@/components/UI';

export default defineComponent({
  name: 'weather-widget',
  components: {
    Weather,
    Settings,
    WeatherHeader,
    ErrorComponent,
    MyCard,
    MyLoader,
  },
  props: {
    timeout: {
      type: Number,
      default: 30,
    },
  },
  setup() {
    const store = useWeatherStore();

    store.$subscribe((_, state) => {
      saveToLocalStorage(LS_WEATHER_STATE, state);
    });

    return { store };
  },
  methods: {
    toggleSettings() {
      this.store.toggleSettings();
      this.store.resetError();
      this.store.resetErrorAddCity();
    },
  },
  mounted() {
    setInterval(() => {
      this.store.loadDataForAllCities();
    }, this.$props.timeout * 60 * 1000);
  },
});
</script>

<style lang="scss">
@import '@/styles/index.scss';
</style>
