<template>
  <div class="my-loader" v-show="visible">
    <div class="my-loader__dot" />
    <div class="my-loader__dot" />
    <div class="my-loader__dot" />
    <div class="my-loader__dot" />
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
