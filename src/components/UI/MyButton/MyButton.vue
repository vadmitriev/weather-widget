<template>
	<button
		class="my-button"
		:class="{
      small : size === 's',
      middle: size === 'm',
      large: size === 'l'
    }">
		<slot></slot>
	</button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'my-button',
  props: {
    size: {
      type: String as PropType<'s' | 'm' | 'l'>,
      default: 'm',
    },
  },
});
</script>
