import { useState, useRef, useCallback } from 'react';

interface Voice {
  voice_id: string;
  name: string;
  description: string;
}

interface TextToSpeechResult {
  isSpeaking: boolean;
  error: string | null;
  speak: (text: string, voiceId: string) => Promise<void>;
  stop: () => void;
}

const ELEVEN_LABS_API_KEY = 'sk_b3dece9c7d8b0a94f8b0a94f8b0a94f8b0a94f8b0a94f8b0a94f8b0a94f8b0a94f';
const ELEVEN_LABS_API_URL = 'https://api.elevenlabs.io/v1';

export const AVAILABLE_VOICES: Voice[] = [
  {
    voice_id: 'Q63G7WZ5riIGbK8KmqO9',
    name: 'Energetic Male (CN)',
    description: 'A young male with an energetic, cheerful voice, speaking Mandarin Chinese',
  },
  {
    voice_id: 'NLl76XZRVj1RVeXptX3h',
    name: 'Warm Female (CN)',
    description: 'A young adult female with a warm, friendly tone, speaking Mandarin Chinese',
  },
  {
    voice_id: 'At6gj9vUVdJhTriBsuxE',
    name: 'Friendly Female (CN)',
    description: 'A young adult female voice with a warm, friendly tone in Mandarin Chinese',
  },
  {
    voice_id: '05Cdh2gw2NMzDvykn1nm',
    name: 'Wise Elder (CN)',
    description: 'A middle-aged male with a deep, soothing voice, speaking Mandarin Chinese',
  },
];

export function useTextToSpeech(): TextToSpeechResult {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const speak = useCallback(async (text: string, voiceId: string) => {
    if (!text.trim()) return;

    try {
      setIsSpeaking(true);
      setError(null);

      // Stop any currently playing audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      const response = await fetch(
        `${ELEVEN_LABS_API_URL}/text-to-speech/${voiceId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'xi-api-key': ELEVEN_LABS_API_KEY,
          },
          body: JSON.stringify({
            text,
            model_id: 'eleven_multilingual_v2',
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.75,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Eleven Labs API error: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      audioRef.current = new Audio(audioUrl);
      
      audioRef.current.onended = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
      };

      audioRef.current.onerror = () => {
        setError('Failed to play audio');
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
      };

      await audioRef.current.play();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate speech');
      setIsSpeaking(false);
    }
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsSpeaking(false);
    }
  }, []);

  return {
    isSpeaking,
    error,
    speak,
    stop,
  };
}
