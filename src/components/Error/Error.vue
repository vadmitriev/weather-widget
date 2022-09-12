<template>
  <div class="error-wrapper">
    <div class="error-title">
      Произошла ошибка
    </div>
    <div class="error-content">
      {{ error }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'error-component',
  props: {
    error: {
      type: String,
    },
  },
});
</script>
