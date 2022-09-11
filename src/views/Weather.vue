<template>
  <div></div>
</template>

<script lang="ts">
import { useWeatherStore } from '@/stores';
import { defineComponent } from 'vue';

const Weather = defineComponent({
  name: 'weather-view',
  components: {

  },
  setup() {
    const store = useWeatherStore();

    return {
      cities: store.cities,
      isLoading: store.isLoading,
      error: store.error,
    };
  },
});
export default Weather;
</script>

<style scoped></style>
