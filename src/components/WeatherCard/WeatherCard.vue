<template><div></div></template>

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

<style lang="scss" scoped>
@import "./WeatherCard.scss";
</style>
