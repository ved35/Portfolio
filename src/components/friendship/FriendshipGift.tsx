import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GIFT_ITEMS = [
  { emoji: '💌', label: 'A Love Letter' },
  { emoji: '✨', label: 'Pure Magic' },
  { emoji: '💖', label: 'All My Heart' },
  { emoji: '🌟', label: 'Endless Stars' },
];

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

const FriendshipGift = () => {
  const [opened, setOpened] = useState(false);
  const [showItems, setShowItems] = useState(false);
  const [shaking, setShaking] = useState(false);
  const { ref, visible } = useScrollReveal();

  const handleOpen = () => {
    if (opened) return;
    setShaking(true);
    setTimeout(() => {
      setShaking(false);
      setOpened(true);
      setTimeout(() => setShowItems(true), 600);
    }, 800);
  };

  return (
    <section
      style={{
        padding: '80px 24px',
        maxWidth: 700,
        margin: '0 auto',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      {/* Header */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div style={{
          display: 'inline-block',
          background: 'rgba(52,211,153,0.1)',
          border: '1px solid rgba(52,211,153,0.25)',
          borderRadius: 100,
          padding: '6px 18px',
          fontSize: '0.8rem',
          color: '#6ee7b7',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: 20,
        }}>
          ✦ A Surprise For You ✦
        </div>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 2.8rem)',
          fontWeight: 800,
          background: 'linear-gradient(135deg, #34d399, #a78bfa)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          margin: '0 0 16px',
        }}>
          I Got You Something 🎁
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', marginBottom: 56 }}>
          Go on... click to open it!
        </p>
      </motion.div>

      {/* Gift Box */}
      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key="box"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={visible ? { opacity: 1, scale: 1 } : {}}
            transition={{ type: 'spring', stiffness: 150, delay: 0.3 }}
            style={{ cursor: 'pointer', display: 'inline-block', position: 'relative' }}
            onClick={handleOpen}
          >
            <motion.div
              animate={shaking ? {
                x: [-8, 8, -8, 8, 0],
                rotate: [-5, 5, -5, 5, 0],
              } : {
                y: [0, -8, 0],
              }}
              transition={shaking ? {
                duration: 0.6,
                ease: 'easeInOut',
              } : {
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              whileHover={{ scale: 1.06 }}
              style={{ fontSize: '8rem', lineHeight: 1, userSelect: 'none' }}
            >
              🎁
            </motion.div>

            {/* Sparkles around */}
            {!shaking && ['✨', '⭐', '💫', '🌟'].map((s, i) => (
              <motion.div
                key={i}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.2, 0],
                  x: [0, (i % 2 === 0 ? 1 : -1) * (30 + i * 10)],
                  y: [0, -30 - i * 10],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.5,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
                style={{
                  position: 'absolute',
                  top: '20%',
                  left: '50%',
                  fontSize: '1.4rem',
                  pointerEvents: 'none',
                }}
              >
                {s}
              </motion.div>
            ))}

            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ color: '#a78bfa', marginTop: 20, fontSize: '0.95rem', fontWeight: 500 }}
            >
              Click to open 🎀
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="opened"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 150 }}
          >
            <motion.div
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ fontSize: '7rem', marginBottom: 16 }}
            >
              🪄
            </motion.div>

            <motion.h3
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
                fontWeight: 800,
                color: 'white',
                marginBottom: 12,
              }}
            >
              You found something special! 🌟
            </motion.h3>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 36, fontSize: '0.95rem' }}
            >
              Inside this gift is everything I can't always say out loud:
            </motion.p>

            {/* Gift items */}
            <AnimatePresence>
              {showItems && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
                  {GIFT_ITEMS.map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ scale: 0, opacity: 0, y: 20 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.15, type: 'spring', stiffness: 200 }}
                      whileHover={{ scale: 1.08, y: -6 }}
                      style={{
                        background: 'rgba(255,255,255,0.06)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 20,
                        padding: '20px 28px',
                        minWidth: 140,
                        cursor: 'default',
                        transition: 'box-shadow 0.3s',
                        boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
                      }}
                    >
                      <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>{item.emoji}</div>
                      <p style={{ margin: 0, color: 'rgba(255,255,255,0.8)', fontWeight: 600, fontSize: '0.9rem' }}>
                        {item.label}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FriendshipGift;
