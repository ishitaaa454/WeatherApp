import { Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  onUseLocation: () => void;
}

export const EmptyState = ({ onUseLocation }: EmptyStateProps) => {
  return (
    <div className="glass-card rounded-2xl p-12 flex flex-col items-center justify-center text-center max-w-md mx-auto">
      <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <Search className="h-10 w-10 text-primary" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Welcome to Weather Now</h2>
      <p className="text-muted-foreground mb-6">
        Search for a city or use your current location to get started
      </p>
      <Button onClick={onUseLocation} className="glass-card-hover gap-2">
        <MapPin className="h-4 w-4" />
        Use My Location
      </Button>
    </div>
  );
};
