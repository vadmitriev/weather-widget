<template>
  <div class="loader" v-show="visible">
    <div class="dot" />
    <div class="dot" />
    <div class="dot" />
    <div class="dot" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'my-loader',
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
@import "./MyLoader.scss";
</style>
