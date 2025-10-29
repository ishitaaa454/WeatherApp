import { Loader2 } from 'lucide-react';

export const LoadingState = () => {
  return (
    <div className="glass-card rounded-2xl p-12 flex flex-col items-center justify-center text-center max-w-md mx-auto">
      <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
      <h2 className="text-xl font-semibold mb-2">Loading Weather Data</h2>
      <p className="text-muted-foreground">Please wait a moment...</p>
    </div>
  );
};
