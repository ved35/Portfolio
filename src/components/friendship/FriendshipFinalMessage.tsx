import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const MESSAGE =
  "Happy Friendship Day! Thank you for every laugh, every late-night conversation, every crazy adventure, and every moment you've made brighter. No matter where life takes us, you'll always have a special place in my heart. Here's to countless more memories together. 💙";

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

const FriendshipFinalMessage = () => {
  const { ref, visible } = useScrollReveal();
  const [heartBurst, setHeartBurst] = useState(false);

  const handleHeartClick = () => {
    setHeartBurst(true);
    setTimeout(() => setHeartBurst(false), 2000);
  };

  return (
    <section
      style={{
        padding: '80px 24px 60px',
        maxWidth: 820,
        margin: '0 auto',
        position: 'relative',
      }}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 60 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Label */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(236,72,153,0.1)',
            border: '1px solid rgba(236,72,153,0.25)',
            borderRadius: 100,
            padding: '6px 18px',
            fontSize: '0.8rem',
            color: '#f9a8d4',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: 20,
          }}>
            ✦ From the Heart ✦
          </div>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #f9a8d4, #c4b5fd, #93c5fd)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: 0,
          }}>
            A Note Just For You 💌
          </h2>
        </div>

        {/* Card */}
        <div
          style={{
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(30px)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 32,
            padding: 'clamp(32px, 5vw, 56px)',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 30px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
        >
          {/* Gradient glow inside */}
          <div style={{
            position: 'absolute',
            top: '-30%',
            right: '-20%',
            width: '60%',
            height: '60%',
            background: 'radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-20%',
            left: '-10%',
            width: '50%',
            height: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Opening quotes */}
          <div style={{
            fontSize: '5rem',
            color: 'rgba(236,72,153,0.15)',
            fontFamily: 'Georgia, serif',
            lineHeight: 0.8,
            marginBottom: 24,
            fontWeight: 900,
          }}>
            "
          </div>

          {/* Message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={visible ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 1.2 }}
            style={{
              fontSize: 'clamp(1rem, 2.2vw, 1.25rem)',
              lineHeight: 1.85,
              color: 'rgba(255,255,255,0.88)',
              fontWeight: 400,
              fontStyle: 'italic',
              position: 'relative',
              zIndex: 1,
              margin: '0 0 36px',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {MESSAGE}
          </motion.p>

          {/* Signature */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 1 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              borderTop: '1px solid rgba(255,255,255,0.06)',
              paddingTop: 24,
            }}
          >
            <div style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.3rem',
            }}>
              💙
            </div>
            <div>
              <p style={{ margin: 0, color: 'white', fontWeight: 700, fontSize: '1rem' }}>Your Bestie</p>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>Friendship Day, 2025</p>
            </div>
          </motion.div>
        </div>

        {/* Heart button */}
        <div style={{ textAlign: 'center', marginTop: 40, position: 'relative' }}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleHeartClick}
            style={{
              background: 'linear-gradient(135deg, #ec4899, #ef4444)',
              border: 'none',
              borderRadius: '50%',
              width: 64,
              height: 64,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 30px rgba(236,72,153,0.5)',
              position: 'relative',
            }}
          >
            <motion.div
              animate={heartBurst ? { scale: [1, 1.5, 1] } : { scale: [1, 1.1, 1] }}
              transition={heartBurst ? { duration: 0.4 } : { duration: 1.5, repeat: Infinity }}
            >
              <Heart size={28} fill="white" color="white" />
            </motion.div>

            {/* Heart particles */}
            {heartBurst && Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                animate={{
                  scale: [0, 1, 0.5],
                  x: Math.cos((i / 12) * Math.PI * 2) * 80,
                  y: Math.sin((i / 12) * Math.PI * 2) * 80,
                  opacity: 0,
                }}
                transition={{ duration: 1, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  fontSize: '1.2rem',
                  pointerEvents: 'none',
                }}
              >
                {['💖', '💕', '❤️', '💗'][i % 4]}
              </motion.div>
            ))}
          </motion.button>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', marginTop: 12 }}>
            Click the heart 💖
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default FriendshipFinalMessage;
