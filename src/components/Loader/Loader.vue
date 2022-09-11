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
  name: 'loader-component',
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
@import "./Loader.scss";
</style>
