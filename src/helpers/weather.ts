export const calcWindDirection = (windDeg: number): string => {
  const val = Math.floor(windDeg / 22.5 + 0.5);
  const arr = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
  ];
  return arr[val % 16];
};

export const calcDewPoint = (
  temperature: number,
  humidity: number,
  isCelsius = true,
): number => {
  const temp: number = isCelsius ? temperature : (temperature - 32) / 1.8;

  const ans = temp
    - (14.55 + 0.114 * temp) * (1 - 0.01 * humidity)
    - ((2.5 + 0.007 * temp) * (1 - 0.01 * humidity)) ** 3
    - (15.9 + 0.117 * temp) * (1 - 0.01 * humidity) ** 14;

  if (isCelsius) {
    return ans;
  }
  const value = ans * (9.0 / 5.0);
  return value + 32.0;
};

export const getWindDescriptionBySpeed = (speed: number): string => {
  // http://gyre.umeoce.maine.edu/data/gomoos/buoy/php/variable_description.php?variable=wind_2_speed
  switch (true) {
    case (speed < 0.5):
      return 'Calm';
    case (speed < 1.5):
      return 'Light air';
    case (speed < 3):
      return 'Light breeze';
    case (speed < 5):
      return 'Gentle breeze';
    case (speed < 8):
      return 'Moderate breeze';
    case (speed < 10.5):
      return 'Fresh breeze';
    case (speed < 13.5):
      return 'Strong breeze';
    case (speed < 16.5):
      return 'Moderate gale';
    case (speed < 20):
      return 'Fresh gale';
    case (speed < 23.5):
      return 'Strong gale';
    case (speed < 27.5):
      return 'Whole gale';
    case (speed < 31.5):
      return 'Storm';
    default:
      return 'Hurricane';
  }
};
