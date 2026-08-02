import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Heart, Sparkles } from 'lucide-react';

const FLOATING_EMOJIS = ['💖', '✨', '🌟', '💫', '🎉', '🥳', '💝', '🌈', '🦋', '💕'];

const FloatingEmoji = ({ emoji, delay, x }: { emoji: string; delay: number; x: number }) => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0, scale: 0 }}
      animate={{ y: -120, opacity: [0, 1, 1, 0], scale: [0, 1.2, 1, 0.8] }}
      transition={{ duration: 4, delay, repeat: Infinity, repeatDelay: Math.random() * 4 + 2 }}
      style={{
        position: 'absolute',
        left: `${x}%`,
        bottom: '20%',
        fontSize: '1.8rem',
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      {emoji}
    </motion.div>
  );
};

const Particle = ({ x, y, color }: { x: number; y: number; color: string }) => (
  <motion.div
    initial={{ x, y, opacity: 1, scale: 1 }}
    animate={{ x: x + (Math.random() - 0.5) * 200, y: y - Math.random() * 200, opacity: 0, scale: 0 }}
    transition={{ duration: 1.5, ease: 'easeOut' }}
    style={{
      position: 'fixed',
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: color,
      pointerEvents: 'none',
      zIndex: 9999,
    }}
  />
);

const TYPING_TEXTS = [
  'Happy Friendship Day! 💙',
  'You are my forever bestie ✨',
  'Partners in crime, always 💕',
];

interface FriendshipHeroProps {
  isActive: boolean;
  onComplete: () => void;
}

const FriendshipHero = ({ isActive, onComplete }: FriendshipHeroProps) => {
  const [typedText, setTypedText] = useState('');
  const [textIdx, setTextIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string }[]>([]);
  const confettiRef = useRef<HTMLDivElement>(null);

  // Typing effect
  useEffect(() => {
    const full = TYPING_TEXTS[textIdx];
    const speed = isDeleting ? 40 : 80;
    const timer = setTimeout(() => {
      if (!isDeleting && typedText === full) {
        setTimeout(() => setIsDeleting(true), 2500);
        return;
      }
      if (isDeleting && typedText === '') {
        setIsDeleting(false);
        setTextIdx(i => (i + 1) % TYPING_TEXTS.length);
        return;
      }
      setTypedText(isDeleting ? full.slice(0, typedText.length - 1) : full.slice(0, typedText.length + 1));
    }, speed);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, textIdx]);

  const handleCTAClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const colors = ['#ec4899', '#a78bfa', '#60a5fa', '#fbbf24', '#34d399'];
    const newParticles = Array.from({ length: 18 }, (_, i) => ({
      id: Date.now() + i,
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      color: colors[i % colors.length],
    }));
    setParticles(p => [...p, ...newParticles]);
    setTimeout(() => setParticles([]), 2000);

    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);

    // Advance to next section after brief celebration
    setTimeout(() => onComplete(), 500);
  };

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && <ConfettiBurst />}
      </AnimatePresence>

      {/* Particles on click */}
      {particles.map(p => <Particle key={p.id} x={p.x} y={p.y} color={p.color} />)}

      {/* Floating emojis */}
      {FLOATING_EMOJIS.map((e, i) => (
        <FloatingEmoji key={i} emoji={e} delay={i * 0.4} x={5 + i * 9} />
      ))}

      {/* Stars background */}
      <div ref={confettiRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {Array.from({ length: 60 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2 + Math.random() * 3, delay: Math.random() * 5, repeat: Infinity }}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              borderRadius: '50%',
              background: ['#ec4899', '#a78bfa', '#60a5fa', '#fbbf24'][Math.floor(Math.random() * 4)],
              boxShadow: '0 0 6px currentColor',
            }}
          />
        ))}
      </div>

      {/* Badge */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          background: 'rgba(236,72,153,0.12)',
          border: '1px solid rgba(236,72,153,0.3)',
          borderRadius: 100,
          padding: '8px 20px',
          fontSize: '0.85rem',
          color: '#f9a8d4',
          marginBottom: 32,
          backdropFilter: 'blur(12px)',
        }}
      >
        <Heart size={14} fill="#ec4899" color="#ec4899" />
        Friendship Day
        <Sparkles size={14} color="#a78bfa" />
      </motion.div>

      {/* Main Title */}
      <motion.h1
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontSize: 'clamp(3rem, 8vw, 6.5rem)',
          fontWeight: 900,
          lineHeight: 1.1,
          marginBottom: 12,
          fontFamily: "'Inter', sans-serif",
          background: 'linear-gradient(135deg, #fbbf24 0%, #ec4899 40%, #a78bfa 70%, #60a5fa 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '-0.02em',
        }}
      >
        Happy
        <br />
        Friendship Day
      </motion.h1>

      {/* Typing effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={{
          fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
          color: '#c4b5fd',
          minHeight: '2.2em',
          marginBottom: 40,
          fontWeight: 500,
        }}
      >
        {typedText}
        <span
          style={{
            display: 'inline-block',
            width: 2,
            height: '1.1em',
            background: '#ec4899',
            marginLeft: 3,
            verticalAlign: 'text-bottom',
            animation: 'blink 1s step-end infinite',
          }}
        />
        <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
      </motion.div>

      {/* CTA Button */}
      <motion.button
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 150 }}
        whileHover={{ scale: 1.06, y: -4 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleCTAClick}
        style={{
          background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
          border: 'none',
          borderRadius: 100,
          padding: '16px 44px',
          color: 'white',
          fontSize: '1.05rem',
          fontWeight: 700,
          cursor: 'pointer',
          boxShadow: '0 0 40px rgba(236,72,153,0.4), 0 8px 32px rgba(0,0,0,0.3)',
          letterSpacing: '0.02em',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <span style={{ position: 'relative', zIndex: 1 }}>Let's Celebrate! 🎉</span>
        <motion.div
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            zIndex: 0,
          }}
        />
      </motion.button>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1.5, y: { duration: 1.5, repeat: Infinity } }}
        style={{ position: 'absolute', bottom: 32, color: '#a78bfa', opacity: 0.6 }}
      >
        <ChevronDown size={28} />
      </motion.div>
    </section>
  );
};

const ConfettiBurst = () => {
  const colors = ['#ec4899', '#a78bfa', '#60a5fa', '#fbbf24', '#34d399', '#f87171', '#fb923c'];
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9998 }}>
      {Array.from({ length: 80 }).map((_, i) => {
        const color = colors[i % colors.length];
        const startX = 50 + (Math.random() - 0.5) * 20;
        return (
          <motion.div
            key={i}
            initial={{ x: `${startX}vw`, y: '50vh', opacity: 1, scale: 1, rotate: 0 }}
            animate={{
              x: `${startX + (Math.random() - 0.5) * 80}vw`,
              y: `${80 + Math.random() * 40}vh`,
              opacity: 0,
              scale: 0.2,
              rotate: Math.random() * 720 - 360,
            }}
            transition={{ duration: 2.5 + Math.random(), ease: 'easeOut' }}
            style={{
              position: 'absolute',
              width: Math.random() > 0.5 ? 10 : 6,
              height: Math.random() > 0.5 ? 10 : 6,
              background: color,
              borderRadius: Math.random() > 0.5 ? '50%' : 2,
              top: 0,
              left: 0,
            }}
          />
        );
      })}
    </div>
  );
};

export default FriendshipHero;
