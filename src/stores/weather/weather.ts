import { getFromLocalStorage, isFullfilled, isTypeOf } from '../../helpers';
import { WeatherService } from '../../api';
import { AxiosError, AxiosResponse } from 'axios';
import { LS_WEATHER_STATE } from '../../constants';
import { City, WeatherResponseError, Coord } from '../../interfaces';
import { fillCityData } from './helpers';
import create from 'zustand';
import { persist } from 'zustand/middleware';

export interface WeatherState {
  cities: City[];
  isLoading: boolean;
  error: string | null;
  errorAddCity: string | null;
  isSettingsOpen: boolean;

  setCities: (cities: City[]) => void;
  pushCity: (city: City) => void;
  addCity: (cityName: string) => void;
  removeCity: (city: City) => void;
  setIsLoading: (value: boolean) => void;
  setError: (error: string | null) => void;
  resetError: () => void;
  setErrorAddCity: (error: string | null) => void;
  resetErrorAddCity: () => void;
  setIsSettingsOpen: (value: boolean) => void;
  toggleSettings: () => void;
  loadDataForOneCity: <T extends 'coords' | 'cityName'>(
    payload: T extends 'coords' ? Coord : string,
  ) => Promise<City | undefined>;
  loadDataForAllCities: () => void;
  getLocation: () => void;
}

const location = navigator.geolocation;

const savedState = getFromLocalStorage(LS_WEATHER_STATE);

const useWeatherStore = create(
  persist<WeatherState>(
    (set, get) => ({
      cities: savedState?.cities ?? [],
      isLoading: false,
      error: null,
      errorAddCity: null,
      isSettingsOpen: savedState?.isSettingsOpen ?? false,
      setCities: (cities: City[]) => {
        set({ cities });
      },
      pushCity: (city: City) => {
        set((state) => ({ cities: [...state.cities, city] }));
      },
      addCity: async (cityName: string) => {
        if (cityName.length < 2) return;
        const isCityExists = get().cities.find(
          (c) => c.name.toLowerCase() === cityName.toLowerCase(),
        );
        if (isCityExists) {
          const errorText = `City ${cityName} has already been added to the list`;
          set({ errorAddCity: errorText });

          return;
        }
        set({ isLoading: true });
        try {
          const city = await get().loadDataForOneCity<'cityName'>(cityName);
          if (city) {
            set({ cities: [...get().cities, city] });
          }
          set({ errorAddCity: null });
        } catch (e: unknown) {
          if (e instanceof Error) {
            set({ errorAddCity: e.message });
          }
        } finally {
          set({ isLoading: false });
        }
      },
      removeCity: (city: City) => {
        set((state) => ({
          cities: state.cities.filter((c) => c.id !== city.id),
        }));
      },
      setIsLoading: (value: boolean) => {
        set({ isLoading: value });
      },
      setError: (error: string | null) => {
        set({ error });
      },
      resetError: () => {
        set({ error: null });
      },
      setErrorAddCity: (error) => {
        set({ errorAddCity: error });
      },
      resetErrorAddCity: () => {
        set({ errorAddCity: null });
      },
      setIsSettingsOpen: (value: boolean) => {
        set({ isSettingsOpen: value });
      },
      toggleSettings: () => {
        set({ isSettingsOpen: !get().isSettingsOpen });
      },
      loadDataForOneCity: async <T extends 'coords' | 'cityName'>(
        payload: T extends 'coords' ? Coord : string,
      ) => {
        try {
          set({ isLoading: true });
          let res: AxiosResponse;
          if (isTypeOf<Coord>(payload, 'lat')) {
            res = await WeatherService.getWeatherByCoords(payload);
          } else {
            res = await WeatherService.getWeatherByCityName(payload);
          }

          if (isTypeOf<WeatherResponseError>(res.data, 'message')) {
            throw new Error(res.data.message);
          }
          set({ error: null });
          return fillCityData(res.data);
        } catch (e: unknown) {
          if (e instanceof AxiosError) {
            const errorText = e.response?.data.message || 'Some error occured';
            throw new Error(errorText);
          }
        } finally {
          set({ isLoading: false });
        }
      },
      loadDataForAllCities: async () => {
        const citiesResponse = await Promise.allSettled(
          get().cities.map(async (city) =>
            get().loadDataForOneCity<'cityName'>(city.name),
          ),
        ).then((data) => data.filter(isFullfilled).map((c) => c.value));
        set({ cities: citiesResponse as City[] });
      },
      getLocation: async () => {
        const successGetLocation: PositionCallback = async (
          pos: GeolocationPosition,
        ) => {
          const coords: Coord = {
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          };
          const city = await get().loadDataForOneCity<'coords'>(coords);
          if (city) {
            set({ cities: [...get().cities, city] });
          }
        };

        location.getCurrentPosition(successGetLocation);
      },
    }),
    { name: LS_WEATHER_STATE, getStorage: () => localStorage },
  ),
);

export default useWeatherStore;
