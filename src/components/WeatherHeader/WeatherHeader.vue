<template>
	<div class="wrapper">
    <my-button v-show="!showSettings" class="btn">
      <setting-outlined
        class="icon"
      />
    </my-button>

    <my-button v-show="showSettings" class="btn">
      <close-outlined
        class="icon"
        v-show="showSettings"
      />
    </my-button>

	</div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { SettingOutlined, CloseOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  name: 'weather-header',
  components: { SettingOutlined, CloseOutlined },
  props: {
    showSettings: {
      type: Boolean,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
@import './WeatherHeader.scss'
</style>
