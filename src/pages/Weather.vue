<template></template>

<script lang="ts">
import { useWeatherStore } from "@/stores/weather";
import { defineComponent } from "vue";

import draggable from "vuedraggable";
const Weather = defineComponent({
  name: "weather",
  components: {
    draggable,
  },
  setup() {
    const { cities, isLoading, error } = useWeatherStore();

    return {
      cities,
      isLoading,
      error,
    };
  },
});
export default Weather;
</script>

<style scoped></style>
