import React from 'react';
import ReactDOM from 'react-dom/client';
import { WeatherWidget } from '@/widgets';
import '@/styles/index.css';

const widget = document.getElementsByTagName('weather-widget')[0];
const timeout = Number(widget.getAttribute('timeout')) || 30;

ReactDOM.createRoot(widget).render(
  <React.StrictMode>
    <WeatherWidget timeout={timeout} />
  </React.StrictMode>,
);
