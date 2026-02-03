import { useState, useRef, useEffect } from 'react';
import { Send, Settings, Trash2, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useTextToSpeech, AVAILABLE_VOICES } from '@/hooks/useTextToSpeech';
import { useChat } from '@/hooks/useChat';
import { VoiceWave } from '@/components/VoiceWave';
import { ChatMessage } from '@/components/ChatMessage';
import { MicButton } from '@/components/MicButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [selectedVoice, setSelectedVoice] = useState(AVAILABLE_VOICES[0].voice_id);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { transcript, isListening, startListening, stopListening, resetTranscript } = useSpeechRecognition();
  const { isSpeaking, speak, stop } = useTextToSpeech();
  const { messages, isLoading, sendMessage, clearMessages } = useChat();

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle speech recognition transcript
  useEffect(() => {
    if (transcript && !isListening) {
      handleSendMessage(transcript);
      resetTranscript();
    }
  }, [transcript, isListening]);

  // Speak assistant responses
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === 'assistant' && autoSpeak && soundEnabled) {
      speak(lastMessage.content, selectedVoice);
    }
  }, [messages, autoSpeak, soundEnabled, selectedVoice]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;
    await sendMessage(text);
    setInputText('');
  };

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      stop();
      startListening();
    }
  };

  const isProcessing = isLoading || isSpeaking;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                Luna
              </h1>
              <p className="text-xs text-slate-400">Powered by Eleven Labs</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="text-slate-400 hover:text-white hover:bg-slate-800"
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <Settings className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-slate-900 border-slate-800">
                <SheetHeader>
                  <SheetTitle className="text-white">Settings</SheetTitle>
                  <SheetDescription className="text-slate-400">
                    Customize your voice assistant experience
                  </SheetDescription>
                </SheetHeader>
                
                <div className="mt-8 space-y-6">
                  <div className="space-y-3">
                    <Label className="text-slate-300">Voice</Label>
                    <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                      <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                        <SelectValue placeholder="Select a voice" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        {AVAILABLE_VOICES.map((voice) => (
                          <SelectItem
                            key={voice.voice_id}
                            value={voice.voice_id}
                            className="text-white hover:bg-slate-700 focus:bg-slate-700"
                          >
                            <div className="flex flex-col items-start">
                              <span>{voice.name}</span>
                              <span className="text-xs text-slate-400">{voice.description}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator className="bg-slate-800" />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-slate-300">Auto-speak responses</Label>
                      <p className="text-xs text-slate-500">Automatically read assistant responses aloud</p>
                    </div>
                    <Switch
                      checked={autoSpeak}
                      onCheckedChange={setAutoSpeak}
                      className="data-[state=checked]:bg-violet-500"
                    />
                  </div>

                  <Separator className="bg-slate-800" />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-slate-300">Sound enabled</Label>
                      <p className="text-xs text-slate-500">Toggle all audio output</p>
                    </div>
                    <Switch
                      checked={soundEnabled}
                      onCheckedChange={setSoundEnabled}
                      className="data-[state=checked]:bg-violet-500"
                    />
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <Button
              variant="ghost"
              size="icon"
              onClick={clearMessages}
              className="text-slate-400 hover:text-red-400 hover:bg-red-500/10"
            >
              <Trash2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6 flex flex-col h-[calc(100vh-80px)]">
        {/* Voice Wave Visualization */}
        <div className="flex-shrink-0 mb-6">
          <div className="relative bg-slate-900/50 rounded-2xl p-6 border border-slate-800/50 backdrop-blur-sm">
            <VoiceWave 
              isActive={isListening || isSpeaking} 
              isListening={isListening} 
            />
            <div className="text-center mt-2">
              <p className={cn(
                'text-sm font-medium transition-colors duration-300',
                isListening ? 'text-red-400' : isSpeaking ? 'text-violet-400' : 'text-slate-500'
              )}>
                {isListening ? 'Listening...' : isSpeaking ? 'Speaking...' : 'Ready'}
              </p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <ScrollArea className="flex-1 mb-6 pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 p-4 text-slate-400">
                <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce delay-200" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="flex-shrink-0">
          <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800/50 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <MicButton
                isListening={isListening}
                isLoading={isProcessing}
                onClick={handleMicClick}
                disabled={isProcessing}
              />
              
              <div className="flex-1 flex gap-2">
                <Input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(inputText);
                    }
                  }}
                  placeholder="Type your message..."
                  className="flex-1 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-violet-500"
                  disabled={isListening}
                />
                <Button
                  onClick={() => handleSendMessage(inputText)}
                  disabled={!inputText.trim() || isListening || isLoading}
                  className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white px-6"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <p className="text-center text-xs text-slate-500 mt-3">
              {isListening 
                ? 'Click the microphone to stop listening' 
                : 'Click the microphone to speak or type your message'}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
