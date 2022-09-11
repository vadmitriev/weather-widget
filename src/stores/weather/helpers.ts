import { calcDewPoint, calcWindDirection } from '@/helpers';
import { WeatherResponseOK, City } from '@/interfaces';

export const fillCityData = (res: WeatherResponseOK): City => ({
  id: res.sys.id,
  name: res.name,
  country: res.sys.country,
  temperature: res.main.temp,
  feelsLike: res.main.feels_like,
  windSpeed: res.wind.speed,
  windDirection: calcWindDirection(res.wind.deg),
  pressure: res.main.pressure,
  humidity: res.main.humidity,
  dewPoint: calcDewPoint(res.main.temp, res.main.humidity),
  visibility: res.visibility,
  icon: res.weather.icon,
});
