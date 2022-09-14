import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.REACT_APP_WEATHER_URL,
});

export default api;
