import { Search, MapPin, Moon, Sun, Thermometer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useWeatherStore } from '@/store/weatherStore';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavbarProps {
  onSearch: (city: string) => void;
  onUseLocation: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Navbar = ({ onSearch, onUseLocation, darkMode, onToggleDarkMode }: NavbarProps) => {
  const [searchValue, setSearchValue] = useState('');
  const { unit, toggleUnit, recentSearches } = useWeatherStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      onSearch(searchValue.trim());
      setSearchValue('');
    }
  };

  return (
    <nav className="glass-card sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Thermometer className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">Weather Now</h1>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <form onSubmit={handleSubmit} className="relative flex-1 sm:min-w-[300px]">
              <Input
                type="text"
                placeholder="Search city..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="pr-20 glass-card border-border/50"
              />
              <div className="absolute right-1 top-1/2 -translate-y-1/2 flex gap-1">
                {recentSearches.length > 0 && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0"
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="glass-card">
                      <DropdownMenuLabel>Recent Searches</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {recentSearches.map((city) => (
                        <DropdownMenuItem
                          key={city}
                          onClick={() => onSearch(city)}
                          className="cursor-pointer"
                        >
                          {city}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
                <Button type="submit" size="sm" className="h-8 px-3">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </form>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onUseLocation}
                className="glass-card border-border/50"
              >
                <MapPin className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Location</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={toggleUnit}
                className="glass-card border-border/50"
              >
                °{unit}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={onToggleDarkMode}
                className="glass-card border-border/50"
              >
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
