<template>
  <div class="settings-view">
    <div class="settings-view__header">
      Settings
    </div>
    <draggable
      :list="cities"
      item-key="id"
      class="settings-view__list"
      ghost-class="ghost"
      handle=".settings-view__list_item_menu"
    >
      <template #item="{ element }">
        <li class="settings-view__list_item">
          <div class="settings-view__list_item__left">
            <div class="settings-view__list_item_menu">
              <icon-menu />
            </div>
            <span class="settings-view__list_list-item_name">
              {{element.name}}
            </span>
          </div>

          <my-button size="s" @click="store.removeCity(element)">
            <icon-delete />
          </my-button>
        </li>
      </template>
    </draggable>

    <div class="settings-view__add-city">
      <span class="settings-view__add-city_title">
        Add Location
      </span>
      <add-city />
    </div>
  </div>
</template>

<script lang="ts">
import { useWeatherStore } from '@/stores';
import { computed, defineComponent } from 'vue';
import {
  MenuOutlined as IconMenu,
  DeleteOutlined as IconDelete,
} from '@ant-design/icons-vue';
import AddCity from '@/components/AddCity/AddCity.vue';
import { MyButton } from '@/components/UI';
import draggable from 'vuedraggable';

export default defineComponent({
  name: 'settings-view',
  components: {
    IconDelete,
    IconMenu,
    AddCity,
    draggable,
    MyButton,
  },
  setup() {
    const store = useWeatherStore();

    return { store, cities: computed(() => store.cities) };
  },
});
</script>
