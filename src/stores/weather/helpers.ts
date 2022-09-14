import {
  calcDewPoint,
  calcWindDirection,
  getWindDescriptionBySpeed,
} from '../../helpers';
import { WeatherResponseOK, City } from '../../interfaces';

export const fillCityData = (res: WeatherResponseOK): City => ({
  id: res.sys.id,
  name: res.name,
  country: res.sys.country,
  temperature: Math.round(res.main.temp),
  feelsLike: res.main.feels_like,
  pressure: Math.round(res.main.pressure),
  humidity: Math.round(res.main.humidity),
  dewPoint: Math.round(calcDewPoint(res.main.temp, res.main.humidity)),
  visibility: Math.round(res.visibility / 1000),
  icon: res.weather[0].icon,
  weatherDescription: res.weather[0].description,
  wind: {
    speed: Math.round(res.wind.speed),
    direction: calcWindDirection(res.wind.deg),
    description: getWindDescriptionBySpeed(res.wind.speed),
    deg: res.wind.deg,
  },
});
