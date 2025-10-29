import { AlertCircle, CloudOff, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorStateProps {
  error: string;
  onRetry?: () => void;
}

export const ErrorState = ({ error, onRetry }: ErrorStateProps) => {
  const isNotFound = error.toLowerCase().includes('not found');
  const isNetwork = error.toLowerCase().includes('network') || error.toLowerCase().includes('fetch');
  
  const Icon = isNotFound ? Search : isNetwork ? CloudOff : AlertCircle;

  return (
    <div className="glass-card rounded-2xl p-12 flex flex-col items-center justify-center text-center max-w-md mx-auto">
      <div className="h-20 w-20 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
        <Icon className="h-10 w-10 text-destructive" />
      </div>
      <h2 className="text-2xl font-bold mb-2">
        {isNotFound ? 'City Not Found' : isNetwork ? 'Connection Error' : 'Oops!'}
      </h2>
      <p className="text-muted-foreground mb-6">{error}</p>
      {onRetry && (
        <Button onClick={onRetry} className="glass-card-hover">
          Try Again
        </Button>
      )}
    </div>
  );
};
