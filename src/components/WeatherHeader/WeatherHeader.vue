<template>
	<div class="weather-header-wrapper">
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
import { MyButton } from '@/components/UI';

export default defineComponent({
  name: 'weather-header',
  components: { SettingOutlined, CloseOutlined, MyButton },
  props: {
    showSettings: {
      type: Boolean,
      required: true,
    },
  },
});
</script>
