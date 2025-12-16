import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-slate-500 animate-in fade-in duration-500">
      <Loader2 className="w-10 h-10 animate-spin text-brand-500 mb-4" />
      <p className="text-lg font-medium">Consulting the library...</p>
      <p className="text-sm opacity-75">Crafting your study notes.</p>
    </div>
  );
};

export default LoadingState;