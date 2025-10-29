export type TempUnit = 'C' | 'F';

export const celsiusToFahrenheit = (celsius: number): number => {
  return (celsius * 9/5) + 32;
};

export const fahrenheitToCelsius = (fahrenheit: number): number => {
  return (fahrenheit - 32) * 5/9;
};

export const formatTemp = (temp: number, unit: TempUnit): string => {
  const value = unit === 'F' ? celsiusToFahrenheit(temp) : temp;
  return `${Math.round(value)}°${unit}`;
};

export const convertSpeed = (mps: number, unit: TempUnit): string => {
  if (unit === 'F') {
    // Convert to mph
    return `${Math.round(mps * 2.237)} mph`;
  }
  // Keep as km/h
  return `${Math.round(mps * 3.6)} km/h`;
};

