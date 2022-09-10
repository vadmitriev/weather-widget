<template>
  <div class="container">
    <weather v-if="!isSettingsOpen" />
    <settings v-if="isSettingsOpen" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Settings, Weather } from "@/pages";
import { useWeatherStore } from "./stores/weather";

export default defineComponent({
  name: "weather-widget",
  components: { Weather, Settings },
  setup() {
    const { isSettingsOpen } = useWeatherStore();

    return { isSettingsOpen };
  },
});
</script>

<style lang="'scss'">
@import '@/styles/main.scss';
</style>
