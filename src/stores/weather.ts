import { LS_WEATHER_STATE } from "./../constants/localStorage";
import { City } from "@/interfaces";
import { defineStore } from "pinia";

export interface WeatherState {
  cities: City[];
  isLoading: boolean;
  error: string | null;
}

export const useWeatherStore = defineStore({
  id: "weather",
  persist: {
    storage: localStorage,
    paths: [LS_WEATHER_STATE],
  },
  state: (): WeatherState => ({
    cities: [],
    isLoading: false,
    error: null,
  }),
  actions: {
    addCity(city: City) {
      const isCityExists = this.cities.find((c) => c.id === city.id);
      if (isCityExists) {
        this.error = "This city has already been added to the list";
        return this.error;
      }
      this.cities.push(city);
    },
    removeCity(city: City) {
      this.cities = this.cities.filter((c) => c.id !== city.id);
    },
    setIsLoading(isLoading: boolean) {
      this.isLoading = isLoading;
    },
    setError(error: string | null) {
      this.error = error;
    },
  },
});

export default useWeatherStore;
