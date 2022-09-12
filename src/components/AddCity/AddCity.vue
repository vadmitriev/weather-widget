<template>
	<div class="wrapper">
		<div class="error" v-show="store.errorAddCity && showError">
			{{store.errorAddCity}}
		</div>
		<div class="add-city">
			<input
				placeholder="Добавить город"
				ref="input"
        @input="handleInput"
				@keyup.enter="handleAdd"
			/>
			<my-button @click="handleAdd" bgHover="false">
				<enter-outlined />
			</my-button>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { EnterOutlined } from '@ant-design/icons-vue';
import { useWeatherStore } from '@/stores';

export default defineComponent({
  name: 'add-city',
  components: { EnterOutlined },
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
    async handleAdd() {
      await this.store.addCity(this.inputValue);
      this.showError = true;
      this.inputValue = '';
      (this.$refs.input as HTMLInputElement).value = '';
    },
    focusInput() {
      (this.$refs.input as HTMLInputElement).focus();
    },
    handleInput(event: Event) {
      this.showError = false;
      this.inputValue = (event.target as HTMLInputElement).value;
    },
  },
  mounted() {
    this.focusInput();
  },
});
</script>

<style scoped lang="scss">
@import './AddCity.scss'
</style>
