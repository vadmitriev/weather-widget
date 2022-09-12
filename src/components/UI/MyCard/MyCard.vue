<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'my-card',
});
</script>

<style scoped lang="scss">
@import './MyCard.scss';
</style>
