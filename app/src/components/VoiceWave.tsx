import { useEffect, useRef } from 'react';

interface VoiceWaveProps {
  isActive: boolean;
  isListening?: boolean;
}

export function VoiceWave({ isActive, isListening = false }: VoiceWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const barsRef = useRef<number[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const barCount = 60;
    const barWidth = canvas.width / barCount;
    
    // Initialize bars
    if (barsRef.current.length === 0) {
      barsRef.current = Array(barCount).fill(0).map(() => Math.random() * 0.3);
    }

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerY = canvas.height / 2;
      const maxBarHeight = canvas.height * 0.8;

      barsRef.current.forEach((baseHeight, i) => {
        // Create wave pattern
        const wave1 = Math.sin(time * 0.05 + i * 0.2) * 0.5 + 0.5;
        const wave2 = Math.sin(time * 0.03 + i * 0.15) * 0.5 + 0.5;
        const wave3 = Math.cos(time * 0.07 + i * 0.1) * 0.5 + 0.5;
        
        let heightMultiplier = baseHeight;
        
        if (isActive) {
          heightMultiplier = (wave1 + wave2 + wave3) / 3;
          if (isListening) {
            heightMultiplier *= 1.5;
          }
        } else {
          heightMultiplier = baseHeight * 0.3;
        }

        const barHeight = maxBarHeight * heightMultiplier;
        const x = i * barWidth;
        
        // Create gradient
        const gradient = ctx.createLinearGradient(0, centerY - barHeight / 2, 0, centerY + barHeight / 2);
        
        if (isListening) {
          gradient.addColorStop(0, 'rgba(239, 68, 68, 0.8)');
          gradient.addColorStop(0.5, 'rgba(239, 68, 68, 1)');
          gradient.addColorStop(1, 'rgba(239, 68, 68, 0.8)');
        } else if (isActive) {
          gradient.addColorStop(0, 'rgba(139, 92, 246, 0.8)');
          gradient.addColorStop(0.5, 'rgba(139, 92, 246, 1)');
          gradient.addColorStop(1, 'rgba(139, 92, 246, 0.8)');
        } else {
          gradient.addColorStop(0, 'rgba(139, 92, 246, 0.3)');
          gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.4)');
          gradient.addColorStop(1, 'rgba(139, 92, 246, 0.3)');
        }

        ctx.fillStyle = gradient;
        
        // Draw rounded bar
        const radius = barWidth * 0.3;
        ctx.beginPath();
        ctx.roundRect(
          x + barWidth * 0.1,
          centerY - barHeight / 2,
          barWidth * 0.8,
          barHeight,
          [radius, radius, radius, radius]
        );
        ctx.fill();
      });

      time += 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, isListening]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={120}
      className="w-full h-24"
    />
  );
}
