<template>
	<div
		class="btn"
		:class="{'bg-hover' : bgHover === true}">
		<slot></slot>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'my-button',
  props: {
    bgHover: {
      type: Boolean,
      default: true,
    },
  },
});
</script>

<style scoped lang="scss">
@import './MyButton.scss';
</style>
