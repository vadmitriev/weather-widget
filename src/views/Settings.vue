<template><div><draggable /></div></template>

<script lang="ts">
import { defineComponent } from 'vue';

import draggable from 'vuedraggable';

export default defineComponent({
  name: 'settings-view',
  components: {
    draggable,
  },
});
</script>

<style scoped></style>
