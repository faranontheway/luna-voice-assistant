import { User, Bot } from 'lucide-react';
import type { Message } from '@/hooks/useChat';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        'flex gap-3 p-4 rounded-2xl animate-in fade-in slide-in-from-bottom-2 duration-300',
        isUser 
          ? 'bg-gradient-to-r from-violet-600/20 to-purple-600/20 ml-8' 
          : 'bg-gradient-to-r from-slate-800/50 to-slate-700/50 mr-8'
      )}
    >
      <div
        className={cn(
          'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
          isUser 
            ? 'bg-gradient-to-br from-violet-500 to-purple-600' 
            : 'bg-gradient-to-br from-cyan-500 to-blue-600'
        )}
      >
        {isUser ? (
          <User className="w-4 h-4 text-white" />
        ) : (
          <Bot className="w-4 h-4 text-white" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-300 mb-1">
          {isUser ? 'You' : 'Assistant'}
        </p>
        <p className="text-slate-100 whitespace-pre-wrap break-words">
          {message.content}
        </p>
      </div>
    </div>
  );
}
