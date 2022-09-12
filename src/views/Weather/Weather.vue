<template>
  <div class="weather-wrapper">
    <div
      v-if="store.cities.length === 0"
      class="empty"
    >
      <div class="title">
        Здесь пока ничего нет
      </div>
      <div class="add-city">
        <add-city />
      </div>
    </div>
    <div
      v-else
      class="weather-list"
    >
      <ul>
        <ul v-for="city in store.cities" :key="city.id">
          <weather-card :city="city" />
        </ul>
      </ul>
    </div>
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
