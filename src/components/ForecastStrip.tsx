import { ForecastItem, getWeatherIconUrl } from '@/lib/weather';
import { formatTemp } from '@/lib/units';
import { useWeatherStore } from '@/store/weatherStore';
import { format } from 'date-fns';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface ForecastStripProps {
  forecast: ForecastItem[];
}

export const ForecastStrip = ({ forecast }: ForecastStripProps) => {
  const { unit } = useWeatherStore();

  return (
    <div className="glass-card rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4">5-Day Forecast</h2>
      <ScrollArea className="w-full">
        <div className="flex gap-4 pb-4">
          {forecast.map((item, index) => (
            <div
              key={index}
              className="glass-card glass-card-hover flex-shrink-0 rounded-xl p-4 min-w-[140px] border border-border/50"
            >
              <div className="flex flex-col items-center gap-2">
                <p className="text-sm font-medium">
                  {format(new Date(item.dt * 1000), 'EEE')}
                </p>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(item.dt * 1000), 'h:mm a')}
                </p>
                <img
                  src={getWeatherIconUrl(item.icon)}
                  alt={item.description}
                  className="h-12 w-12"
                />
                <p className="text-2xl font-bold">{formatTemp(item.temp, unit)}</p>
                <p className="text-xs text-center capitalize text-muted-foreground line-clamp-2">
                  {item.description}
                </p>
                {item.pop > 0.1 && (
                  <p className="text-xs text-blue-500">
                    {Math.round(item.pop * 100)}% rain
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};
