<template>
  <div class="weather-view">
    <div
      v-if="store.cities.length === 0"
      class="weather-view__empty"
    >
      <div class="weather-view__empty_title">
        It looks like there's nothing here
      </div>
      <div class="weather-view__empty_add-city">
        <add-city />
      </div>
    </div>
    <ul
      v-else
      class="weather-view__weather-list"
    >
      <li
        v-for="city in store.cities"
        :key="city.id"
        class="weather-view__weather-list_city"
      >
        <weather-card :city="city" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { useWeatherStore } from '@/stores';
import { defineComponent } from 'vue';
import { WeatherCard, AddCity } from '@/components';

export default defineComponent({
  name: 'weather-view',
  components: {
    WeatherCard,
    AddCity,
  },
  setup() {
    const store = useWeatherStore();

    return {
      store,
    };
  },
  mounted() {
    if (!this.store.cities.length) {
      this.store.getLocation();
    }
    this.store.loadDataForAllCities();
  },
});
</script>
