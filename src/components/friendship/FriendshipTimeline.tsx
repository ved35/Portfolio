import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MEMORIES = [
  {
    id: 1,
    emoji: '☕',
    date: 'Day One',
    title: 'The Beginning',
    desc: 'When we first met and somehow instantly clicked. Those first laughs set the tone for everything.',
    color: '#fbbf24',
    glow: 'rgba(251,191,36,0.2)',
  },
  {
    id: 2,
    emoji: '🌙',
    date: 'Late Nights',
    title: 'Midnight Talks',
    desc: 'Those 2AM conversations where we solved all the world\'s problems and made zero sense.',
    color: '#a78bfa',
    glow: 'rgba(167,139,250,0.2)',
  },
  {
    id: 3,
    emoji: '🎭',
    date: 'The Drama Era',
    title: 'Adventures & Chaos',
    desc: 'Every crazy plan, every "let\'s just go for it" moment. Pure controlled chaos — but together.',
    color: '#ec4899',
    glow: 'rgba(236,72,153,0.2)',
  },
  {
    id: 4,
    emoji: '💪',
    date: 'Tough Times',
    title: 'Through It All',
    desc: 'When life got hard, you were there. No judgment, just pure unconditional support.',
    color: '#34d399',
    glow: 'rgba(52,211,153,0.2)',
  },
  {
    id: 5,
    emoji: '🎉',
    date: 'Right Now',
    title: 'Here & Happy',
    desc: 'Still making memories, still laughing too loud, still the best duo around.',
    color: '#60a5fa',
    glow: 'rgba(96,165,250,0.2)',
  },
];


const MemoryCard = ({ memory, index }: { memory: typeof MEMORIES[0]; index: number }) => {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200 + index * 150);
    return () => clearTimeout(t);
  }, [index]);

  const isRight = index % 2 === 1;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: isRight ? 'flex-end' : 'flex-start',
        position: 'relative',
        marginBottom: 16,
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: isRight ? 60 : -60, scale: 0.9 }}
        animate={visible ? { opacity: 1, x: 0, scale: 1 } : {}}
        transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: 'calc(50% - 32px)',
          background: hovered ? `rgba(255,255,255,0.06)` : 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${hovered ? memory.color + '50' : 'rgba(255,255,255,0.07)'}`,
          borderRadius: 20,
          padding: '24px 28px',
          cursor: 'default',
          transition: 'all 0.3s ease',
          boxShadow: hovered
            ? `0 12px 40px rgba(0,0,0,0.3), 0 0 40px ${memory.glow}`
            : '0 4px 20px rgba(0,0,0,0.2)',
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        }}
      >
        <motion.div
          animate={hovered ? { scale: 1.2, rotate: 10 } : { scale: 1, rotate: 0 }}
          style={{ fontSize: '2.2rem', marginBottom: 12 }}
        >
          {memory.emoji}
        </motion.div>
        <p style={{ margin: '0 0 6px', fontSize: '0.75rem', color: memory.color, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {memory.date}
        </p>
        <h3 style={{ margin: '0 0 10px', fontSize: '1.1rem', fontWeight: 700, color: 'white' }}>
          {memory.title}
        </h3>
        <p style={{ margin: 0, fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
          {memory.desc}
        </p>
      </motion.div>

      {/* Center line dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={visible ? { scale: 1 } : {}}
        transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 16,
          height: 16,
          borderRadius: '50%',
          background: memory.color,
          boxShadow: `0 0 20px ${memory.color}80`,
          zIndex: 1,
        }}
      />
    </div>
  );
};

interface FriendshipTimelineProps {
  isActive: boolean;
  onComplete: () => void;
}

const FriendshipTimeline = ({ isActive, onComplete }: FriendshipTimelineProps) => {

  return (
    <section
      style={{
        padding: '80px 24px',
        maxWidth: 900,
        margin: '0 auto',
        position: 'relative',
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isActive ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: 72 }}
      >
        <div style={{
          display: 'inline-block',
          background: 'rgba(251,191,36,0.1)',
          border: '1px solid rgba(251,191,36,0.25)',
          borderRadius: 100,
          padding: '6px 18px',
          fontSize: '0.8rem',
          color: '#fbbf24',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: 20,
        }}>
          ✦ Memory Lane ✦
        </div>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 800,
          background: 'linear-gradient(135deg, #fbbf24, #ec4899)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          margin: 0,
        }}>
          Our Story So Far ✨
        </h2>
      </motion.div>

      {/* Timeline */}
      <div style={{ position: 'relative' }}>
        {/* Vertical line */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isActive ? { scaleY: 1 } : {}}
          transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.3 }}
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: 2,
            background: 'linear-gradient(180deg, #ec4899, #8b5cf6, #60a5fa)',
            transformOrigin: 'top',
            opacity: 0.4,
          }}
        />

        {MEMORIES.map((m, i) => (
          <MemoryCard key={m.id} memory={m} index={i} />
        ))}
      </div>

      {/* Continue after timeline is shown */}
      {isActive && (
        <div style={{ textAlign: 'center', marginTop: 48, animation: 'fdSlideUp 0.6s ease forwards' }}>
          <button className="fd-next-btn" onClick={onComplete}>
            Keep Going 🌟
          </button>
        </div>
      )}
    </section>
  );
};

export default FriendshipTimeline;
