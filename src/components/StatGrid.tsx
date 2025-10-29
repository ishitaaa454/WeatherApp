import { Droplets, Wind, Gauge, Sunrise, Sunset, Eye, CloudRain } from 'lucide-react';
import { CurrentWeather } from '@/lib/weather';
import { convertSpeed } from '@/lib/units';
import { useWeatherStore } from '@/store/weatherStore';
import { format } from 'date-fns';

interface StatGridProps {
  weather: CurrentWeather;
}

export const StatGrid = ({ weather }: StatGridProps) => {
  const { unit } = useWeatherStore();

  const stats = [
    {
      icon: Droplets,
      label: 'Humidity',
      value: `${weather.humidity}%`,
    },
    {
      icon: Wind,
      label: 'Wind Speed',
      value: convertSpeed(weather.windSpeed, unit),
    },
    {
      icon: Gauge,
      label: 'Pressure',
      value: `${weather.pressure} hPa`,
    },
    {
      icon: Sunrise,
      label: 'Sunrise',
      value: format(new Date(weather.sunrise * 1000), 'h:mm a'),
    },
    {
      icon: Sunset,
      label: 'Sunset',
      value: format(new Date(weather.sunset * 1000), 'h:mm a'),
    },
    {
      icon: Eye,
      label: 'Visibility',
      value: `${(weather.visibility / 1000).toFixed(1)} km`,
    },
    {
      icon: CloudRain,
      label: 'Cloudiness',
      value: `${weather.clouds}%`,
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="glass-card glass-card-hover rounded-xl p-4 flex flex-col gap-2"
        >
          <div className="flex items-center gap-2 text-muted-foreground">
            <stat.icon className="h-4 w-4" />
            <span className="text-sm">{stat.label}</span>
          </div>
          <p className="text-xl font-semibold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};
