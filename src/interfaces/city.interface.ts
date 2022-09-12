interface Wind {
  direction: string;
  description: string;
  deg: number;
  speed: number;
}

export interface City {
  id: number;
  name: string;
  country: string;
  temperature: number;
  feelsLike: number;
  pressure: number;
  humidity: number;
  dewPoint: number;
  visibility: number;
  icon: string;
  wind: Wind;
  weatherDescription: string;
}
