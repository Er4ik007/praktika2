import React, { useRef, useEffect, useState } from 'react';

const MEME_EMOJIS = ['🐕', '🐶', '🐸', '🔥', '💎', '🚀', '⭐', '🌙', '🍕', '💎', '🐱', '🦄'];

interface MemeItem {
  x: number;
  y: number;
  size: number;
  speed: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  emoji: string;
}

export const CosmicBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsVisible(document.documentElement.getAttribute('data-theme') === 'waterfall');
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const memes: MemeItem[] = [];
    const count = Math.floor(canvas.width / 90);
    for (let i = 0; i < count; i++) {
      memes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 2 - canvas.height,
        size: 30 + Math.random() * 30,
        speed: 1 + Math.random() * 3,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        opacity: 0.15 + Math.random() * 0.5,
        emoji: MEME_EMOJIS[Math.floor(Math.random() * MEME_EMOJIS.length)],
      });
    }

    let time = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 1;

      for (const meme of memes) {
        meme.y += meme.speed;
        meme.rotation += meme.rotationSpeed;

        if (meme.y > canvas.height + 60) {
          meme.y = -60;
          meme.x = Math.random() * canvas.width;
        }

        const twinkle = Math.sin(time * 0.015 + meme.x * 0.008) * 0.15 + 0.85;
        const alpha = meme.opacity * twinkle;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(meme.x, meme.y);
        ctx.rotate(meme.rotation);
        ctx.font = `${meme.size}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(meme.emoji, 0, 0);
        ctx.restore();
      }

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};
