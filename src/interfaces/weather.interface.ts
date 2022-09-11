/* eslint-disable camelcase */
export interface Coord {
  lon: number;
  lat: number;
}

export interface WeatherData {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface WeatherMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

export interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

export interface Clouds {
  all: number;
}

export interface Rain {
  'rain.1h': number;
  'rain.3h': number;
}

export interface Snow {
  'snow.1h': number;
  'snow.3h': number;
}

export interface WeatherSys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface WeatherResponseOK {
  coord: Coord;
  weather: WeatherData;
  base: string;
  main: WeatherMain;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  rain: Rain;
  snow: Snow;
  dt: number;
  sys: WeatherSys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface WeatherResponseError {
  cod: number;
  message: string;
}

export type WeatherResponse = WeatherResponseOK | WeatherResponseError;
