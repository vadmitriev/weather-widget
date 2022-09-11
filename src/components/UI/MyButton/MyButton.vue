<template>
	<div class="btn">
		<slot></slot>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'my-button',
});
</script>

<style scoped lang="scss">
@import './MyButton.scss';
</style>
