export interface CurrentWeather {
  city: string;
  country: string;
  temp: number;
  feelsLike: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDeg: number;
  description: string;
  icon: string;
  dt: number;
  sunrise: number;
  sunset: number;
  tempMin: number;
  tempMax: number;
  visibility: number;
  clouds: number;
}

export interface ForecastItem {
  dt: number;
  temp: number;
  description: string;
  icon: string;
  pop: number; // probability of precipitation
}

const API_KEY = import.meta.env.VITE_OWM_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchCurrentWeather = async (city: string): Promise<CurrentWeather> => {
  if (!API_KEY) {
    throw new Error('API key not configured. Please add VITE_OWM_KEY to your environment variables.');
  }

  const response = await fetch(
    `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('City not found. Please check the spelling and try again.');
    }
    throw new Error('Failed to fetch weather data. Please try again later.');
  }

  const data = await response.json();

  return {
    city: data.name,
    country: data.sys.country,
    temp: data.main.temp,
    feelsLike: data.main.feels_like,
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    windSpeed: data.wind.speed,
    windDeg: data.wind.deg,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    dt: data.dt,
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
    tempMin: data.main.temp_min,
    tempMax: data.main.temp_max,
    visibility: data.visibility,
    clouds: data.clouds.all,
  };
};

export const fetchCurrentWeatherByCoords = async (lat: number, lon: number): Promise<CurrentWeather> => {
  if (!API_KEY) {
    throw new Error('API key not configured. Please add VITE_OWM_KEY to your environment variables.');
  }

  const response = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch weather data for your location.');
  }

  const data = await response.json();

  return {
    city: data.name,
    country: data.sys.country,
    temp: data.main.temp,
    feelsLike: data.main.feels_like,
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    windSpeed: data.wind.speed,
    windDeg: data.wind.deg,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    dt: data.dt,
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
    tempMin: data.main.temp_min,
    tempMax: data.main.temp_max,
    visibility: data.visibility,
    clouds: data.clouds.all,
  };
};

export const fetchForecast = async (city: string): Promise<ForecastItem[]> => {
  if (!API_KEY) {
    throw new Error('API key not configured. Please add VITE_OWM_KEY to your environment variables.');
  }

  const response = await fetch(
    `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch forecast data.');
  }

  const data = await response.json();

  return data.list.map((item: any) => ({
    dt: item.dt,
    temp: item.main.temp,
    description: item.weather[0].description,
    icon: item.weather[0].icon,
    pop: item.pop,
  }));
};

export const fetchForecastByCoords = async (lat: number, lon: number): Promise<ForecastItem[]> => {
  if (!API_KEY) {
    throw new Error('API key not configured. Please add VITE_OWM_KEY to your environment variables.');
  }

  const response = await fetch(
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch forecast data for your location.');
  }

  const data = await response.json();

  return data.list.map((item: any) => ({
    dt: item.dt,
    temp: item.main.temp,
    description: item.weather[0].description,
    icon: item.weather[0].icon,
    pop: item.pop,
  }));
};

export const getWeatherIconUrl = (icon: string): string => {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
};
