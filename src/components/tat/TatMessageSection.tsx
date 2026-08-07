import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, Feather, Star } from 'lucide-react';

interface Props {
  musicEnabled: boolean;
  onRestart: () => void;
}

interface FireworkParticle {
  id: number;
  x: number;
  y: number;
  color: string;
}

const TatMessageSection = ({ musicEnabled, onRestart }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const [fireworks, setFireworks] = useState<FireworkParticle[]>([]);
  const [hearts, setHearts] = useState<{ id: number; x: number; delay: number; icon: string }[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const colors = ['#fbbf24', '#ec4899', '#a78bfa', '#60a5fa', '#34d399', '#f43f5e', '#f97316'];

  const triggerAudioCelebration = () => {
    if (!musicEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // Bright C Major Arpeggio
      const now = ctx.currentTime;
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0, now + idx * 0.12);
        gain.gain.linearRampToValueAtTime(0.08, now + idx * 0.12 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.6);
        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 0.7);
      });
    } catch {
      // Audio context not available
    }
  };

  const launchEffects = () => {
    // Fireworks
    const newFw: FireworkParticle[] = Array.from({ length: 4 }).map(() => ({
      id: Date.now() + Math.random(),
      x: Math.random() * (window.innerWidth * 0.8) + window.innerWidth * 0.1,
      y: Math.random() * (window.innerHeight * 0.5) + window.innerHeight * 0.15,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setFireworks(prev => [...prev, ...newFw]);
    setTimeout(() => {
      setFireworks(prev => prev.filter(f => !newFw.find(nf => nf.id === f.id)));
    }, 1600);

    // Floating icons
    const symbols = ['💖', '🌟', '🎓', '✨', '🏆', '⭐', '💗'];
    const newHearts = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i + Math.random(),
      x: Math.random() * 90 + 5,
      delay: i * 0.15,
      icon: symbols[Math.floor(Math.random() * symbols.length)],
    }));
    setHearts(prev => [...prev, ...newHearts]);
    setTimeout(() => {
      setHearts(prev => prev.filter(h => !newHearts.find(nh => nh.id === h.id)));
    }, 5500);
  };

  const handleCelebrate = () => {
    setCelebrating(true);
    triggerAudioCelebration();
    launchEffects();

    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      launchEffects();
    }, 600);

    setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }, 5500);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <section
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 24px 100px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 2,
      }}
    >
      {/* Dynamic Fireworks & Floating Icons */}
      {fireworks.map(fw => (
        <div key={fw.id} style={{ position: 'fixed', left: fw.x, top: fw.y, pointerEvents: 'none', zIndex: 9990 }}>
          {Array.from({ length: 14 }).map((_, i) => {
            const angle = (i / 14) * 360;
            const dist = Math.random() * 50 + 50;
            const dx = Math.cos((angle * Math.PI) / 180) * dist;
            const dy = Math.sin((angle * Math.PI) / 180) * dist;
            return (
              <motion.div
                key={i}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{ x: dx, y: dy, opacity: 0, scale: 0.2 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: fw.color,
                  boxShadow: `0 0 8px ${fw.color}`,
                }}
              />
            );
          })}
        </div>
      ))}

      {hearts.map(h => (
        <motion.div
          key={h.id}
          initial={{ y: '100vh', opacity: 0, scale: 0.2, rotate: -15 }}
          animate={{ y: '-15vh', opacity: [0, 1, 1, 0], scale: [0.2, 1.3, 1, 0.4], rotate: 15 }}
          transition={{ duration: 5, delay: h.delay, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            left: `${h.x}%`,
            bottom: 0,
            fontSize: '2.2rem',
            pointerEvents: 'none',
            zIndex: 9991,
          }}
        >
          {h.icon}
        </motion.div>
      ))}

      {celebrating && (
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9989, overflow: 'hidden' }}>
          {Array.from({ length: 50 }).map((_, i) => {
            const color = colors[i % colors.length];
            const startX = Math.random() * 100;
            return (
              <motion.div
                key={i}
                initial={{ x: `${startX}vw`, y: '-5vh', opacity: 1, rotate: 0 }}
                animate={{
                  x: `${startX + (Math.random() - 0.5) * 20}vw`,
                  y: '105vh',
                  opacity: [1, 1, 0],
                  rotate: Math.random() * 720 - 360,
                }}
                transition={{
                  duration: 3.5 + Math.random() * 2,
                  delay: Math.random() * 2.5,
                  ease: 'linear',
                }}
                style={{
                  position: 'absolute',
                  width: Math.random() > 0.5 ? 9 : 6,
                  height: Math.random() > 0.5 ? 9 : 6,
                  background: color,
                  borderRadius: Math.random() > 0.5 ? '50%' : 2,
                  boxShadow: `0 0 6px ${color}80`,
                }}
              />
            );
          })}
        </div>
      )}

      <div style={{ maxWidth: 840, width: '100%', position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(236, 72, 153, 0.12)',
            border: '1px solid rgba(236, 72, 153, 0.35)',
            borderRadius: 100,
            padding: '8px 22px',
            fontSize: '0.85rem',
            fontWeight: 700,
            color: '#ec4899',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: 20,
          }}
        >
          <Feather size={16} />
          <span>From My Heart To Yours</span>
        </div>

        <h2
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: 800,
            color: '#ffffff',
            margin: '0 0 14px',
            lineHeight: 1.2,
          }}
        >
          A Special Wish For My Bestie 💖
        </h2>

        <p style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '1.05rem', marginBottom: 36 }}>
          {!isOpen ? 'Tap the letter envelope to read your bestie’s message ✉️' : 'Written with endless love, pride & belief ✨'}
        </p>

        {/* Envelope / Letter Container */}
        <motion.div
          layout
          style={{
            background: 'rgba(255, 255, 255, 0.035)',
            backdropFilter: 'blur(24px)',
            border: isOpen
              ? '1px solid rgba(251, 191, 36, 0.45)'
              : '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: 28,
            padding: isOpen ? '40px 36px' : '36px 28px',
            boxShadow: isOpen
              ? '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(251, 191, 36, 0.2)'
              : '0 12px 40px rgba(0, 0, 0, 0.3)',
            transition: 'border 0.4s ease, box-shadow 0.4s ease',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {!isOpen ? (
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setIsOpen(true);
                handleCelebrate();
              }}
              style={{ cursor: 'pointer', padding: '20px 0' }}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                style={{ fontSize: '4.5rem', marginBottom: 16 }}
              >
                💌
              </motion.div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fbbf24', margin: '0 0 10px' }}>
                Open Your Bestie's Heartfelt Note
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.98rem', margin: 0 }}>
                Click here to unseal your personalized best of luck wish ✨
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ textAlign: 'left' }}
            >
              {/* Top Seal */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Star size={20} color="#fbbf24" fill="#fbbf24" />
                  <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fbbf24' }}>
                    Dearest Bestie,
                  </span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.5)', background: 'rgba(255, 255, 255, 0.06)', padding: '4px 12px', borderRadius: 100 }}>
                  TAT Exam 2026 🎓
                </div>
              </div>

              {/* Heartfelt Letter Paragraphs */}
              <div style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.08rem', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 18 }}>
                <p style={{ marginBottom: 20 }}>
                  I have watched you work so hard over the last <strong style={{ color: '#fbbf24' }}>7 to 8 months</strong>. Day after day, month after month, you stayed consistent, focused, and deeply committed to your dream of passing the <strong style={{ color: '#ec4899' }}>TAT Exam</strong>.
                </p>

                <p style={{ marginBottom: 20 }}>
                  While others saw only your quiet dedication, I saw the endless hours of studying, the stacks of revision notes, the late-night tea cups, and the courage it took to keep pushing forward even when you felt tired. That level of discipline is truly inspiring, and I couldn't be prouder of you!
                </p>

                <p style={{ marginBottom: 20 }}>
                  You are naturally built to be an incredible teacher. You possess the intelligence, patience, warmth, and wisdom to inspire so many young minds in the future. This exam is simply the bridge that takes you to where you belong.
                </p>

                <p style={{ marginBottom: 24 }}>
                  When you step into the exam center tomorrow, take a deep breath, trust your preparation, and remember that <strong style={{ color: '#a855f7' }}>you already possess everything you need to succeed</strong>. Answer with confidence, stay calm, and let your brilliance shine!
                </p>
              </div>

              {/* Sign-off Box */}
              <div
                style={{
                  background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(236, 72, 153, 0.1))',
                  border: '1px solid rgba(251, 191, 36, 0.25)',
                  borderRadius: 20,
                  padding: '24px',
                  marginTop: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 16,
                }}
              >
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Always cheering for you,
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', fontFamily: "'Dancing Script', cursive, sans-serif" }}>
                    Your Bestie Forever ❤️
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <motion.button
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={handleCelebrate}
                    style={{
                      background: 'linear-gradient(135deg, #fbbf24, #f43f5e)',
                      border: 'none',
                      borderRadius: 100,
                      padding: '10px 22px',
                      color: '#ffffff',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      boxShadow: '0 0 20px rgba(251, 191, 36, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <Sparkles size={16} />
                    <span>Celebrate Victory! 🎉</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Post Celebration Badge Reveal */}
        <AnimatePresence>
          {isOpen && celebrating && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, type: 'spring' }}
              style={{ marginTop: 40 }}
            >
              <div
                style={{
                  background: 'linear-gradient(135deg, rgba(52, 211, 153, 0.15), rgba(168, 85, 247, 0.15))',
                  border: '1px solid rgba(52, 211, 153, 0.4)',
                  borderRadius: 24,
                  padding: '28px 32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 16,
                  boxShadow: '0 0 35px rgba(52, 211, 153, 0.25)',
                }}
              >
                <div style={{ fontSize: '2.5rem' }}>🏆</div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#34d399' }}>
                    Future Teacher of the Year Unlocked! 🎓✨
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                    7-8 Months of Hard Work = 100% Guaranteed Success!
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action to restart or go back to start */}
        {isOpen && (
          <div style={{ marginTop: 48 }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onRestart}
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: 100,
                padding: '12px 28px',
                color: '#ffffff',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <RefreshCw size={16} />
              <span>Replay Best of Luck Wish</span>
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TatMessageSection;
