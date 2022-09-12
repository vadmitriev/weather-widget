<template>
  <div class="weather-wrapper">
    <div
      v-if="store.cities.length === 0"
      class="empty"
    >
      <div class="title">
        It looks like there's nothing here
      </div>
      <div class="add-city">
        <add-city />
      </div>
    </div>
    <ul
      v-else
      class="weather-list"
    >
      <li
        v-for="city in store.cities"
        :key="city.id"
        class="city"
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

const Weather = defineComponent({
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
    this.store.loadDataForAllCities();
  },
});
export default Weather;
</script>

<style scoped lang="scss">
@import './Weather.scss';
</style>
