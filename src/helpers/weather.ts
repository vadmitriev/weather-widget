export const calcWindDirection = (windDeg: number): string => {
  const val = Math.floor(windDeg / 22.5 + 0.5);
  const arr = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return arr[val % 16];
};

export const calcDewPoint = (
  temperature: number,
  humidity: number,
  isCelsius: boolean = true
): number => {
  let temp: number = isCelsius ? temperature : (temperature - 32) / 1.8;

  const ans =
    temp -
    (14.55 + 0.114 * temp) * (1 - 0.01 * humidity) -
    Math.pow((2.5 + 0.007 * temp) * (1 - 0.01 * humidity), 3) -
    (15.9 + 0.117 * temp) * Math.pow(1 - 0.01 * humidity, 14);

  if (isCelsius) {
    return ans;
  }
  const value = ans * (9.0 / 5.0);
  return value + 32.0;
};
