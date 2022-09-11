<template>
  <div class="settings">
    <draggable
      v-if="store.cities.length > 0"
      v-model="store.cities"
      tag="ul"
      class="list"
    >
      <transition-group>
        <li v-for="city in store.cities" :key="city.id" class="list-item">

        </li>
      </transition-group>
    </draggable>

  </div>
</template>

<script lang="ts">
import { useWeatherStore } from '@/stores';
import { defineComponent } from 'vue';

import draggable from 'vuedraggable';

const Settings = defineComponent({
  name: 'settings-view',
  components: {
    draggable,
  },
  setup() {
    const store = useWeatherStore();

    return { store };
  },
});
export default Settings;
</script>

<style scoped lang="scss">
@import './Settings.scss';
</style>
