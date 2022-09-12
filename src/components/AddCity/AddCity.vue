<template>
	<div class="add-city-wrapper">
		<div
      class="add-city__error"
      v-show="store.errorAddCity && showError"
    >
			{{store.errorAddCity}}
		</div>
		<div class="add-city__controls">
			<input
				placeholder="Add Location"
				ref="input"
        @input="handleInput"
				@keyup.enter="handleAdd"
			/>
			<my-button @click="handleAdd">
				<enter-outlined />
			</my-button>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { EnterOutlined } from '@ant-design/icons-vue';
import { useWeatherStore } from '@/stores';
import { MyButton } from '@/components/UI';

export default defineComponent({
  name: 'add-city',
  components: { EnterOutlined, MyButton },
  data() {
    return {
      inputValue: '',
      showError: true,
    };
  },
  setup() {
    const store = useWeatherStore();
    const input = ref(null);

    return { input, store };
  },
  methods: {
    focusInput() {
      (this.$refs.input as HTMLInputElement).focus();
    },
    handleInput(event: Event) {
      this.showError = false;
      this.inputValue = (event.target as HTMLInputElement).value;
    },
    async handleAdd() {
      await this.store.addCity(this.inputValue);
      this.showError = true;
      this.inputValue = '';
      (this.$refs.input as HTMLInputElement).value = '';
    },
  },
  mounted() {
    this.focusInput();
  },
});
</script>
