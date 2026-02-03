# Luna - Voice Virtual Assistant

A modern, sleek voice-enabled virtual assistant web application powered by Eleven Labs text-to-speech technology. Luna combines speech recognition, AI chat capabilities, and high-quality voice synthesis for a seamless conversational experience.

![Luna Screenshot](https://via.placeholder.com/800x400/1e1b4b/8b5cf6?text=Luna+Voice+Assistant)

## Features

### Voice Interaction
- **Speech-to-Text**: Speak naturally using your browser's Web Speech API
- **Text-to-Speech**: Luna responds with natural-sounding voices via Eleven Labs
- **Multiple Voice Options**: Choose from 4 different voices (Energetic Male, Warm Female, Friendly Female, Wise Elder)

### Chat Interface
- Real-time conversation with beautiful animated message bubbles
- Type or speak your messages
- Visual voice wave animation that responds to listening/speaking states
- Auto-scroll to latest messages

### Settings & Customization
- **Voice Selection**: Pick your preferred Eleven Labs voice
- **Auto-speak**: Toggle automatic reading of responses
- **Sound Control**: Mute/unmute all audio output
- **Clear Chat**: Reset conversation history

### Design
- Modern dark theme with purple/violet gradients
- Smooth animations and transitions
- Glass-morphism effects and glowing accents
- Fully responsive layout (desktop & mobile)

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Speech Recognition**: Web Speech API
- **Text-to-Speech**: Eleven Labs API
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- An Eleven Labs API key (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/luna-voice-assistant.git
   cd luna-voice-assistant
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Eleven Labs API**
   
   Open `src/hooks/useTextToSpeech.ts` and replace the API key:
   ```typescript
   const ELEVEN_LABS_API_KEY = 'your_eleven_labs_api_key_here';
   ```
   
   Get your free API key at [elevenlabs.io](https://elevenlabs.io)

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   
   Navigate to `http://localhost:5173`

## Building for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

## Deploying to GitHub Pages

### Step 1: Update vite.config.ts

Add the base URL to your `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/luna-voice-assistant/', // Add your repo name here
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### Step 2: Install gh-pages

```bash
npm install --save-dev gh-pages
```

### Step 3: Add deploy scripts to package.json

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### Step 4: Deploy

```bash
npm run deploy
```

Your app will be live at `https://yourusername.github.io/luna-voice-assistant/`

## Project Structure

```
luna-voice-assistant/
├── src/
│   ├── components/
│   │   ├── ChatMessage.tsx      # Message bubble component
│   │   ├── MicButton.tsx        # Animated microphone button
│   │   └── VoiceWave.tsx        # Voice visualization
│   ├── hooks/
│   │   ├── useChat.ts           # Chat state management
│   │   ├── useSpeechRecognition.ts  # Speech-to-text hook
│   │   └── useTextToSpeech.ts   # Eleven Labs TTS hook
│   ├── types/
│   │   └── speech-recognition.d.ts  # Web Speech API types
│   ├── App.tsx                  # Main application
│   ├── App.css                  # Custom styles
│   └── main.tsx                 # Entry point
├── public/
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Environment Variables

For production deployments, you may want to use environment variables:

```bash
# .env.local
VITE_ELEVEN_LABS_API_KEY=your_api_key_here
```

Then update `useTextToSpeech.ts`:
```typescript
const ELEVEN_LABS_API_KEY = import.meta.env.VITE_ELEVEN_LABS_API_KEY;
```

## Browser Compatibility

- **Chrome/Edge**: Full support (Web Speech API + Eleven Labs)
- **Firefox**: Partial support (Eleven Labs only, no speech recognition)
- **Safari**: Partial support (Eleven Labs only, limited speech recognition)

## Customization

### Adding New Voices

Edit `src/hooks/useTextToSpeech.ts`:

```typescript
export const AVAILABLE_VOICES: Voice[] = [
  // ... existing voices
  {
    voice_id: 'your_voice_id',
    name: 'Custom Voice',
    description: 'Description of your voice',
  },
];
```

### Changing the Theme

Edit `src/index.css` to customize colors:

```css
:root {
  --primary: 240 5.9% 10%;
  --primary-foreground: 0 0% 98%;
  /* Add your custom colors */
}
```

### Connecting to a Real AI Backend

Replace the simulated responses in `src/hooks/useChat.ts`:

```typescript
const sendMessage = useCallback(async (content: string) => {
  // ... existing code
  
  // Replace this with your AI API call
  const response = await fetch('https://your-ai-api.com/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: content }),
  });
  
  const data = await response.json();
  // ... handle response
}, []);
```

## Troubleshooting

### Speech Recognition Not Working
- Ensure you're using Chrome or Edge
- Check that microphone permissions are granted
- Verify you're on HTTPS or localhost

### Eleven Labs API Errors
- Verify your API key is correct
- Check your Eleven Labs quota/credits
- Ensure the voice ID is valid

### Build Errors
- Make sure Node.js version is 18+
- Delete `node_modules` and run `npm install` again
- Check TypeScript version compatibility

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Acknowledgments

- [Eleven Labs](https://elevenlabs.io) for the amazing text-to-speech API
- [shadcn/ui](https://ui.shadcn.com) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework

---

Made with 💜 by [Your Name]
