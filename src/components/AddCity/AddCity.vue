<template>
	<div class="wrapper">
		<div class="error" v-show="store.error">
			{{store.error}} error
		</div>
		<div class="add-city">
			<input
				placeholder="Добавить город"
				ref="input"
				v-model="inputValue"
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

export default defineComponent({
  name: 'add-city',
  components: { EnterOutlined },
  data() {
    return {
      inputValue: '',
    };
  },
  setup() {
    const store = useWeatherStore();
    const input = ref(null);

    return { input, store };
  },
  methods: {
    async handleAdd() {
      console.log('inputValue', this.inputValue);
      const city = await this.store.loadWeatherForOneCity<'cityName'>(this.inputValue);
      if (city) {
        this.store.addCity(city);
      }
      this.inputValue = '';
    },
    focusInput() {
      (this.$refs.input as HTMLInputElement).focus();
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
