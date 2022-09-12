<template>
  <div class="settings">
    <div class="header">
      Settings
    </div>
    <draggable
      :list="cities"
      item-key="id"
      class="list"
      ghost-class="ghost"
    >
      <template #item="{ element }">
        <li class="list-item">
          <div class="left">
            <div class="menu">
              <icon-menu />
            </div>
            <span class="name">
              {{element.name}}
            </span>
          </div>

          <my-button size="s" @click="store.removeCity(element)">
            <icon-delete />
          </my-button>
        </li>
      </template>
    </draggable>

    <div class="add-city">
      <span class="title">
        Add Location
      </span>
      <add-city />
    </div>
  </div>
</template>

<script lang="ts">
import { useWeatherStore } from '@/stores';
import { computed, defineComponent } from 'vue';
import { MenuOutlined as IconMenu, DeleteOutlined as IconDelete } from '@ant-design/icons-vue';
import AddCity from '@/components/AddCity/AddCity.vue';
import draggable from 'vuedraggable';

const Settings = defineComponent({
  name: 'settings-view',
  components: {
    IconDelete,
    IconMenu,
    AddCity,
    draggable,
  },
  setup() {
    const store = useWeatherStore();

    return { store, cities: computed(() => store.cities) };
  },
});
export default Settings;
</script>

<style scoped lang="scss">
@import './Settings.scss';
</style>
