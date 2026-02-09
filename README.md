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
