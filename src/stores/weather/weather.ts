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
  errorAddCity: string | null;
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
    errorAddCity: null,
    isSettingsOpen: savedState?.isSettingsOpen ?? false,
  }),
  actions: {
    setCities(cities: City[]) {
      this.cities = cities;
    },
    pushCity(city: City) {
      this.cities.push(city);
    },
    async addCity(cityName: string) {
      const isCityExists = this.cities.find((c) => c.name.toLowerCase() === cityName.toLowerCase());
      if (isCityExists) {
        this.setErrorAddCity(`City ${cityName} has already been added to the list`);
        return;
      }
      this.setIsLoading(true);
      try {
        const city = await this.loadDataForOneCity<'cityName'>(cityName);
        if (city) {
          this.pushCity(city);
        }
        this.resetErrorAddCity();
      } catch (e: unknown) {
        if (e instanceof Error) {
          this.setErrorAddCity(e.message);
        }
      } finally {
        this.setIsLoading(false);
      }
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
    setErrorAddCity(error: string | null) {
      this.errorAddCity = error;
    },
    resetErrorAddCity() {
      this.errorAddCity = null;
    },
    setIsSettingsOpen(value: boolean) {
      this.isSettingsOpen = value;
    },
    toggleSettings() {
      this.isSettingsOpen = !this.isSettingsOpen;
    },
    async loadDataForOneCity<T extends 'coords' | 'cityName'>(
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
          throw new Error(res.data.message);
        }
        this.resetError();
        return fillCityData(res.data);
      } catch (e: unknown) {
        if (e instanceof AxiosError) {
          const errorText = e.response?.data.message || 'Some error occured';
          throw new Error(errorText);
        }
      } finally {
        this.isLoading = false;
      }
      return undefined;
    },
    async loadDataForAllCities() {
      const citiesResponse = await Promise.allSettled(
        this.cities.map(async (city) => this.loadDataForOneCity<'cityName'>(city.name)),
      ).then((data) => data.filter(isFullfilled).map((c) => c.value));

      this.setCities(citiesResponse as City[]);
    },
    async getLocation() {
      const successGetLocation: PositionCallback = async (pos: GeolocationPosition) => {
        const coords: Coord = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        };
        const city = await this.loadDataForOneCity<'coords'>(coords);
        if (city) {
          this.pushCity(city);
        }
      };

      location.getCurrentPosition(successGetLocation);
    },
  },
});

export default useWeatherStore;
