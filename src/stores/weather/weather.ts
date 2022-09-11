import {
  getFromLocalStorage, isFullfilled, isTypeOf,
} from '@/helpers';
import { WeatherService } from '@/api';
import { AxiosError, AxiosResponse } from 'axios';
import { LS_WEATHER_STATE } from '@/constants';
import { City, WeatherResponseError, Coord } from '@/interfaces';
import { defineStore } from 'pinia';
import { fillCityData } from './helpers';

export interface WeatherState {
  cities: City[];
  isLoading: boolean;
  error: string | null;
  isSettingsOpen: boolean;
}

const location = navigator.geolocation;

const savedState = getFromLocalStorage(LS_WEATHER_STATE);

export const useWeatherStore = defineStore({
  id: 'weather',
  state: (): WeatherState => ({
    cities: savedState?.cities ?? [],
    isLoading: false,
    error: null,
    isSettingsOpen: savedState?.isSettingsOpen ?? false,
  }),
  actions: {
    setCities(cities: City[]) {
      this.cities = cities;
    },
    addCity(city: City) {
      const isCityExists = this.cities.find((c) => c.id === city.id);
      if (isCityExists) {
        this.error = `City ${city.name} has already been added to the list`;
        return;
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
    resetError() {
      this.error = null;
    },
    setIsSettingsOpen(value: boolean) {
      this.isSettingsOpen = value;
    },
    toggleSettings() {
      console.log('current visible', this.isSettingsOpen);
      this.isSettingsOpen = !this.isSettingsOpen;
    },
    async loadWeatherForOneCity<T extends 'coords' | 'cityName'>(
      payload: T extends 'coords' ? Coord : string,
    ): Promise<City | undefined> {
      try {
        this.isLoading = true;
        let res: AxiosResponse;
        if (isTypeOf<Coord>(payload, 'lat')) {
          res = await WeatherService.getWeatherByCoords(payload);
        } else {
          res = await WeatherService.getWeatherByCityName(payload);
        }

        if (isTypeOf<WeatherResponseError>(res.data, 'message')) {
          this.error = res.data.message;
          throw new Error(this.error);
        }
        this.resetError();
        return fillCityData(res.data);
      } catch (e: unknown) {
        if (e instanceof AxiosError) {
          this.error = e.response?.statusText || 'Some error occured';
          throw new Error(this.error);
        }
      } finally {
        this.isLoading = false;
      }
      return undefined;
    },
    async loadWeatherForAllCities() {
      const citiesResponse = await Promise.allSettled(
        this.cities.map(async (city) => this.loadWeatherForOneCity<'cityName'>(city.name)),
      ).then((data) => data.filter(isFullfilled).map((c) => c.value));

      this.setCities(citiesResponse as City[]);
    },
    async getLocation() {
      const successGetLocation: PositionCallback = async (pos: GeolocationPosition) => {
        const coords: Coord = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        };

        const city = await this.loadWeatherForOneCity<'coords'>(coords);
        if (city) {
          this.addCity(city);
        }
      };

      location.getCurrentPosition(successGetLocation);
    },
  },
});

export default useWeatherStore;
