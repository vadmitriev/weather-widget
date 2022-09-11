<template>
  <div class="city-wrapper">
    {{city.name}}
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { City } from '@/interfaces';

export default defineComponent({
  name: 'weather-card',
  props: {
    city: {
      type: Object as PropType<City>,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
@import "./WeatherCard.scss";
</style>
