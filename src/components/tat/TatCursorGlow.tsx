import { useEffect, useState } from 'react';

const TatCursorGlow = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState<{ x: number; y: number; id: number; symbol: string }[]>([]);

  useEffect(() => {
    const symbols = ['✨', '⭐', '🎓', '🌟', '📚', '⚡'];
    let counter = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      counter++;
      if (counter % 6 === 0) {
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        const newPoint = { x: e.clientX, y: e.clientY, id: Date.now() + Math.random(), symbol };
        setTrail(prev => [...prev.slice(-12), newPoint]);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: position.y - 120,
          left: position.x - 120,
          width: 240,
          height: 240,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, rgba(236, 72, 153, 0.08) 45%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 999,
          transition: 'transform 0.08s ease-out',
          mixBlendMode: 'screen',
        }}
      />
      {trail.map((t) => (
        <span
          key={t.id}
          style={{
            position: 'fixed',
            top: t.y - 10,
            left: t.x - 10,
            pointerEvents: 'none',
            zIndex: 998,
            fontSize: '0.9rem',
            animation: 'tatSparkleFade 0.8s ease-out forwards',
          }}
        >
          {t.symbol}
        </span>
      ))}
      <style>{`
        @keyframes tatSparkleFade {
          0% { opacity: 1; transform: scale(1) translateY(0); }
          100% { opacity: 0; transform: scale(0.3) translateY(-20px); }
        }
      `}</style>
    </>
  );
};

export default TatCursorGlow;
