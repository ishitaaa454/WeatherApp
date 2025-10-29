import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TempUnit } from '@/lib/units';

interface WeatherStore {
  unit: TempUnit;
  recentSearches: string[];
  toggleUnit: () => void;
  addRecentSearch: (city: string) => void;
  clearRecentSearches: () => void;
}

export const useWeatherStore = create<WeatherStore>()(
  persist(
    (set) => ({
      unit: 'C',
      recentSearches: [],
      toggleUnit: () =>
        set((state) => ({ unit: state.unit === 'C' ? 'F' : 'C' })),
      addRecentSearch: (city: string) =>
        set((state) => {
          const searches = [city, ...state.recentSearches.filter((c) => c !== city)].slice(0, 5);
          return { recentSearches: searches };
        }),
      clearRecentSearches: () => set({ recentSearches: [] }),
    }),
    {
      name: 'weather-storage',
    }
  )
);
