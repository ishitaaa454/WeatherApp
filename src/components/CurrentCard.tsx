import { Cloud, MapPin } from 'lucide-react';
import { CurrentWeather, getWeatherIconUrl } from '@/lib/weather';
import { formatTemp } from '@/lib/units';
import { useWeatherStore } from '@/store/weatherStore';
import { format } from 'date-fns';

interface CurrentCardProps {
  weather: CurrentWeather;
}

export const CurrentCard = ({ weather }: CurrentCardProps) => {
  const { unit } = useWeatherStore();

  return (
    <div className="glass-card glass-card-hover rounded-2xl p-6 sm:p-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">
                {weather.city}, {weather.country}
              </span>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-6xl sm:text-7xl font-bold tracking-tight">
                {formatTemp(weather.temp, unit).split('°')[0]}
                <span className="text-4xl sm:text-5xl text-muted-foreground">°{unit}</span>
              </div>
            </div>
            <p className="mt-4 text-lg capitalize text-foreground/80 flex items-center gap-2">
              <Cloud className="h-5 w-5" />
              {weather.description}
            </p>
          </div>

          <div className="flex flex-col items-center">
            <img
              src={getWeatherIconUrl(weather.icon)}
              alt={weather.description}
              className="h-24 w-24 sm:h-32 sm:w-32 drop-shadow-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
          <div>
            <p className="text-sm text-muted-foreground">Feels like</p>
            <p className="text-xl font-semibold">{formatTemp(weather.feelsLike, unit)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Today's Range</p>
            <p className="text-xl font-semibold">
              {formatTemp(weather.tempMin, unit).split('°')[0]}° / {formatTemp(weather.tempMax, unit).split('°')[0]}°
            </p>
          </div>
        </div>

        <div className="text-xs text-muted-foreground text-right">
          Last updated: {format(new Date(weather.dt * 1000), 'MMM d, h:mm a')}
        </div>
      </div>
    </div>
  );
};
