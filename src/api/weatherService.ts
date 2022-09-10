import api from "./http";
import { WeatherResponse, Coord } from "@/interfaces";
import { AxiosResponse } from "axios";

const appId = process.env.VUE_APP_WEATHER_API_KEY;
const units = "metric";

export default class WeatherService {
  static async getWeatherByCoords(coord: Coord): Promise<AxiosResponse<WeatherResponse>> {
    return api.get("/weather", {
      params: {
        lat: coord.lat,
        lon: coord.lon,
        appId,
        units,
      },
    });
  }

  static async getWeatherByCityName(city: string): Promise<AxiosResponse<WeatherResponse>> {
    return api.get("/weather", {
      params: {
        q: city,
        appId,
        units,
      },
    });
  }
}
