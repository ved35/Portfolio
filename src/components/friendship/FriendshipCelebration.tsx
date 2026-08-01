import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  musicEnabled: boolean;
}

const useScrollReveal = (threshold = 0.2) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
};

interface FireworkParticle {
  id: number;
  x: number;
  y: number;
  color: string;
  angle: number;
  speed: number;
}

const Firework = ({ x, y, color }: { x: number; y: number; color: string }) => {
  return (
    <div style={{ position: 'fixed', left: x, top: y, pointerEvents: 'none', zIndex: 9990 }}>
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i / 16) * 360;
        const r = Math.random() * 60 + 60;
        const dx = Math.cos((angle * Math.PI) / 180) * r;
        const dy = Math.sin((angle * Math.PI) / 180) * r;
        return (
          <motion.div
            key={i}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x: dx, y: dy, opacity: 0, scale: 0.3 }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: Math.random() * 0.1 }}
            style={{
              position: 'absolute',
              width: Math.random() * 6 + 4,
              height: Math.random() * 6 + 4,
              borderRadius: Math.random() > 0.5 ? '50%' : 2,
              background: color,
              boxShadow: `0 0 6px ${color}`,
            }}
          />
        );
      })}
    </div>
  );
};

const FloatingHeart = ({ x, delay }: { x: number; delay: number }) => (
  <motion.div
    initial={{ y: '100vh', opacity: 0, scale: 0, rotate: -20 }}
    animate={{ y: '-20vh', opacity: [0, 1, 1, 0], scale: [0, 1.2, 1, 0.5], rotate: 20 }}
    transition={{ duration: 5, delay, ease: 'easeOut' }}
    style={{
      position: 'fixed',
      left: `${x}%`,
      bottom: 0,
      fontSize: '2rem',
      pointerEvents: 'none',
      zIndex: 9991,
    }}
  >
    {['💖', '💕', '❤️', '💗', '💝'][Math.floor(Math.random() * 5)]}
  </motion.div>
);

const FriendshipCelebration = ({ musicEnabled }: Props) => {
  const { ref, visible } = useScrollReveal(0.1);
  const [celebrating, setCelebrating] = useState(false);
  const [fireworks, setFireworks] = useState<FireworkParticle[]>([]);
  const [hearts, setHearts] = useState<{ id: number; x: number; delay: number }[]>([]);
  const [confettiActive, setConfettiActive] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const colors = ['#ec4899', '#a78bfa', '#60a5fa', '#fbbf24', '#34d399', '#f87171', '#fb923c'];

  const launchFirework = () => {
    const newFw: FireworkParticle[] = [{
      id: Date.now(),
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight * 0.6 + window.innerHeight * 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
      angle: 0,
      speed: 0,
    }];
    setFireworks(p => [...p, ...newFw]);
    setTimeout(() => setFireworks(p => p.filter(f => !newFw.find(nf => nf.id === f.id))), 1800);
  };

  const launchHearts = () => {
    const newHearts = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 90 + 5,
      delay: i * 0.2,
    }));
    setHearts(p => [...p, ...newHearts]);
    setTimeout(() => setHearts(p => p.filter(h => !newHearts.find(nh => nh.id === h.id))), 6000);
  };

  const handleCelebrate = () => {
    if (celebrating) return;
    setCelebrating(true);
    setConfettiActive(true);

    // Rapid fireworks for 5 seconds
    launchFirework();
    launchHearts();
    intervalRef.current = setInterval(() => {
      launchFirework();
      if (Math.random() > 0.6) launchHearts();
    }, 400);

    setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setConfettiActive(false);
    }, 6000);
  };

  // Background music via oscillator (no external file needed)
  useEffect(() => {
    if (musicEnabled) {
      try {
        const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const notes = [523, 587, 659, 698, 784, 880]; // C5 scale
        let time = ctx.currentTime;
        notes.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.value = freq;
          osc.type = 'sine';
          gain.gain.setValueAtTime(0, time + i * 0.4);
          gain.gain.linearRampToValueAtTime(0.06, time + i * 0.4 + 0.1);
          gain.gain.linearRampToValueAtTime(0, time + i * 0.4 + 0.6);
          osc.start(time + i * 0.4);
          osc.stop(time + i * 0.4 + 0.7);
        });
      } catch {
        // AudioContext not available
      }
    }
  }, [musicEnabled]);

  return (
    <section
      style={{
        padding: '80px 24px 120px',
        maxWidth: 800,
        margin: '0 auto',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      {/* Fixed particles */}
      {fireworks.map(fw => (
        <Firework key={fw.id} x={fw.x} y={fw.y} color={fw.color} />
      ))}
      {hearts.map(h => (
        <FloatingHeart key={h.id} x={h.x} delay={h.delay} />
      ))}

      <AnimatePresence>
        {confettiActive && <ConfettiRain />}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
      >
        <div style={{
          display: 'inline-block',
          background: 'rgba(251,191,36,0.1)',
          border: '1px solid rgba(251,191,36,0.3)',
          borderRadius: 100,
          padding: '6px 18px',
          fontSize: '0.8rem',
          color: '#fbbf24',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: 24,
        }}>
          ✦ Grand Finale ✦
        </div>

        <h2 style={{
          fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
          fontWeight: 900,
          background: 'linear-gradient(135deg, #fbbf24 0%, #ec4899 40%, #a78bfa 70%, #60a5fa 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          margin: '0 0 16px',
          lineHeight: 1.2,
        }}>
          Let's Celebrate! 🎉
        </h2>

        <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 56, fontSize: '1rem' }}>
          Press the button and watch the magic happen ✨
        </p>

        {/* THE button */}
        <motion.button
          whileHover={{ scale: 1.06, y: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCelebrate}
          style={{
            background: celebrating
              ? 'linear-gradient(135deg, #34d399, #22c55e)'
              : 'linear-gradient(135deg, #fbbf24, #ec4899, #8b5cf6)',
            border: 'none',
            borderRadius: 100,
            padding: '18px 52px',
            color: 'white',
            fontSize: '1.1rem',
            fontWeight: 800,
            cursor: celebrating ? 'default' : 'pointer',
            boxShadow: celebrating
              ? '0 0 40px rgba(52,211,153,0.5)'
              : '0 0 50px rgba(236,72,153,0.5), 0 8px 32px rgba(0,0,0,0.3)',
            fontFamily: "'Inter', sans-serif",
            letterSpacing: '0.03em',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {celebrating ? '🎊 Celebrating You! 🎊' : '🎆 Launch Celebration!'}

          {!celebrating && (
            <motion.div
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1 }}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)',
              }}
            />
          )}
        </motion.button>

        {/* Post-celebration message */}
        <AnimatePresence>
          {celebrating && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              style={{ marginTop: 48 }}
            >
              <div style={{
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 24,
                padding: '32px 40px',
                maxWidth: 560,
                margin: '0 auto',
                boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
              }}>
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{ fontSize: '3rem', marginBottom: 16 }}
                >
                  🥳
                </motion.div>
                <p style={{
                  color: 'white',
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  lineHeight: 1.6,
                  margin: '0 0 8px',
                }}>
                  Here's to us! 🥂
                </p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', margin: 0 }}>
                  Forever grateful, always by your side 💙
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

const ConfettiRain = () => {
  const colors = ['#ec4899', '#a78bfa', '#60a5fa', '#fbbf24', '#34d399', '#f87171', '#fb923c'];
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9989, overflow: 'hidden' }}>
      {Array.from({ length: 60 }).map((_, i) => {
        const color = colors[i % colors.length];
        const startX = Math.random() * 100;
        return (
          <motion.div
            key={i}
            initial={{ x: `${startX}vw`, y: '-5vh', opacity: 1, rotate: 0 }}
            animate={{
              x: `${startX + (Math.random() - 0.5) * 15}vw`,
              y: '105vh',
              opacity: [1, 1, 0],
              rotate: Math.random() * 720 - 360,
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: Math.random() * 3,
              ease: 'linear',
            }}
            style={{
              position: 'absolute',
              width: Math.random() > 0.5 ? 10 : 6,
              height: Math.random() > 0.5 ? 10 : 6,
              background: color,
              borderRadius: Math.random() > 0.5 ? '50%' : 2,
              top: 0,
              left: 0,
              boxShadow: `0 0 4px ${color}50`,
            }}
          />
        );
      })}
    </div>
  );
};

export default FriendshipCelebration;
