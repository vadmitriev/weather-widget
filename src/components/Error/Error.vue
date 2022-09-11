<template>
  <div class="wrapper">
	<div class="title">
		Произошла ошибка
	</div>
	<div class="content">
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

<style scoped lang="scss">
@import './Error.scss'
</style>
