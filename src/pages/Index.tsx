import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { CurrentCard } from '@/components/CurrentCard';
import { StatGrid } from '@/components/StatGrid';
import { ForecastStrip } from '@/components/ForecastStrip';
import { ErrorState } from '@/components/ErrorState';
import { LoadingState } from '@/components/LoadingState';
import { EmptyState } from '@/components/EmptyState';
import {
  CurrentWeather,
  ForecastItem,
  fetchCurrentWeather,
  fetchCurrentWeatherByCoords,
  fetchForecast,
  fetchForecastByCoords,
} from '@/lib/weather';
import { useWeatherStore } from '@/store/weatherStore';
import { toast } from 'sonner';

const Index = () => {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(true);
  const { addRecentSearch } = useWeatherStore();

  useEffect(() => {
    // Apply dark mode on mount
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSearch = async (city: string) => {
    setLoading(true);
    setError(null);

    try {
      const [weatherData, forecastData] = await Promise.all([
        fetchCurrentWeather(city),
        fetchForecast(city),
      ]);

      setCurrentWeather(weatherData);
      setForecast(forecastData);
      addRecentSearch(weatherData.city);
      toast.success(`Weather loaded for ${weatherData.city}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const [weatherData, forecastData] = await Promise.all([
            fetchCurrentWeatherByCoords(latitude, longitude),
            fetchForecastByCoords(latitude, longitude),
          ]);

          setCurrentWeather(weatherData);
          setForecast(forecastData);
          addRecentSearch(weatherData.city);
          toast.success(`Weather loaded for your location`);
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Failed to fetch weather for your location';
          setError(message);
          toast.error(message);
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setLoading(false);
        const message = 'Unable to access your location. Please check your browser permissions.';
        setError(message);
        toast.error(message);
      }
    );
  };

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen">
      <Navbar
        onSearch={handleSearch}
        onUseLocation={handleUseLocation}
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {loading && <LoadingState />}

          {error && !loading && (
            <ErrorState
              error={error}
              onRetry={currentWeather ? () => handleSearch(currentWeather.city) : undefined}
            />
          )}

          {!loading && !error && !currentWeather && (
            <EmptyState onUseLocation={handleUseLocation} />
          )}

          {!loading && !error && currentWeather && (
            <>
              <CurrentCard weather={currentWeather} />
              <StatGrid weather={currentWeather} />
              {forecast.length > 0 && <ForecastStrip forecast={forecast} />}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
