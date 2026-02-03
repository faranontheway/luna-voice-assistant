import { Mic, MicOff, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MicButtonProps {
  isListening: boolean;
  isLoading?: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export function MicButton({ isListening, isLoading, onClick, disabled }: MicButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={cn(
        'relative group flex items-center justify-center w-20 h-20 rounded-full transition-all duration-300',
        'focus:outline-none focus:ring-4 focus:ring-violet-500/30',
        isListening 
          ? 'bg-gradient-to-br from-red-500 to-red-600 scale-110 shadow-lg shadow-red-500/40' 
          : 'bg-gradient-to-br from-violet-500 to-purple-600 hover:scale-105 shadow-lg shadow-violet-500/40',
        disabled && 'opacity-50 cursor-not-allowed hover:scale-100'
      )}
    >
      {/* Ripple effect when listening */}
      {isListening && (
        <>
          <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-30" />
          <span className="absolute -inset-4 rounded-full bg-red-500/20 animate-pulse" />
        </>
      )}
      
      {/* Glow effect */}
      <div className={cn(
        'absolute inset-0 rounded-full blur-xl transition-opacity duration-300',
        isListening ? 'bg-red-500/50' : 'bg-violet-500/50 group-hover:bg-violet-500/70'
      )} />
      
      {/* Icon */}
      <div className="relative z-10">
        {isLoading ? (
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        ) : isListening ? (
          <MicOff className="w-8 h-8 text-white" />
        ) : (
          <Mic className="w-8 h-8 text-white" />
        )}
      </div>
    </button>
  );
}
