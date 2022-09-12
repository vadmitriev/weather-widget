<template>
  <div class="city-wrapper">
    <div class="title">
      {{city.name}}, {{ city.country}}
    </div>
    <div class="weather">
      <img :src="imgUrl" alt="weather icon">
      <div class="deg">
        <strong>{{city.temperature}}&deg;C</strong>
      </div>
    </div>

    <div class="description">
      Feels like {{city.feelsLike}}&deg;C.
      <span class="weather-description">
        {{city.weatherDescription}}. {{city.wind.description}}
      </span>
    </div>

    <div class="params">
      <p>
        <span class="arrow-icon">
          <icon-arrow :style="windIconStyle" />
        </span>
        {{city.wind.speed}} m/s {{city.wind.direction}}
      </p>
      <p>
        <icon-pressure />
        {{city.pressure}} hPa
      </p>
      <p>
        Humidity: {{city.humidity}}%
      </p>
      <p>
        Dew point: {{city.dewPoint}}&deg;C
      </p>
      <p>
        Visibility: {{city.visibility}} km
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { City } from '@/interfaces';
import { DashboardOutlined as IconPressure, SendOutlined as IconArrow } from '@ant-design/icons-vue';

export default defineComponent({
  name: 'weather-card',
  components: { IconPressure, IconArrow },
  data() {
    const imgUrl = `${process.env.VUE_APP_IMAGE_URL}/${this.city.icon}@2x.png`;
    const windIconStyle = `transform: rotate(${this.city.wind.deg + 180}deg);`;

    return {
      imgUrl,
      windIconStyle,
    };
  },
  props: {
    city: {
      type: Object as PropType<City>,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
@import "./WeatherCard.scss";
</style>
