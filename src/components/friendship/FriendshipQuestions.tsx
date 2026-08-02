import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QUESTIONS = [
  {
    id: 1,
    question: 'Are you happy we\'re friends? 🥺',
    options: ['Absolutely YES!', 'Obviously duh 😤', 'Best decision ever', 'More than anything 💖'],
    emoji: '🌟',
  },
  {
    id: 2,
    question: 'Who is the more dramatic one? 🎭',
    options: ['Definitely you 😂', 'Me, obviously', 'We both know the answer', 'Too close to call 😅'],
    emoji: '🎭',
  },
  {
    id: 3,
    question: 'If we got lost together, who would panic first? 🗺️',
    options: ['You\'d panic, I\'d plan', 'I\'d panic, you\'d laugh', 'We\'d panic together', 'We\'d make it an adventure'],
    emoji: '🗺️',
  },
  {
    id: 4,
    question: 'Will you always save me a seat? 💺',
    options: ['Always & forever 💕', 'Obviously bestie', 'Every single time', 'You never even have to ask'],
    emoji: '💺',
  },
];

const useScrollReveal = (threshold = 0.2) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
};

interface FriendshipQuestionsProps {
  isActive: boolean;
  onComplete: () => void;
}

const FriendshipQuestions = ({ isActive, onComplete }: FriendshipQuestionsProps) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [done, setDone] = useState(false);

  const handleAnswer = (answer: string) => {
    setSelectedAnswers(prev => ({ ...prev, [currentQ]: answer }));
    setTimeout(() => {
      if (currentQ < QUESTIONS.length - 1) {
        setCurrentQ(q => q + 1);
      } else {
        setDone(true);
      }
    }, 600);
  };

  const q = QUESTIONS[currentQ];

  return (
    <section
      id="fd-questions"
      style={{
        padding: '100px 24px',
        maxWidth: 720,
        margin: '0 auto',
        position: 'relative',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isActive ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}>
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(167,139,250,0.1)',
            border: '1px solid rgba(167,139,250,0.25)',
            borderRadius: 100,
            padding: '6px 18px',
            fontSize: '0.8rem',
            color: '#c4b5fd',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: 20,
          }}>
            ✦ Quick Questions ✦
          </div>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #f9a8d4, #c4b5fd)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: 0,
          }}>
            Let me ask you something...
          </h2>
        </div>

        {/* Progress bar */}
        {!done && (
          <div style={{ marginBottom: 40, display: 'flex', gap: 8, justifyContent: 'center' }}>
            {QUESTIONS.map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  width: i === currentQ ? 40 : 8,
                  background: i <= currentQ ? '#ec4899' : 'rgba(255,255,255,0.15)',
                }}
                transition={{ duration: 0.4 }}
                style={{ height: 8, borderRadius: 100 }}
              />
            ))}
          </div>
        )}

        {/* Question card */}
        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div
              key={q.id}
              initial={{ x: 60, opacity: 0, scale: 0.95 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: -60, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 28,
                padding: '40px 36px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
              }}
            >
              {/* Emoji */}
              <motion.div
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ fontSize: '3.5rem', textAlign: 'center', marginBottom: 24 }}
              >
                {q.emoji}
              </motion.div>

              {/* Question text */}
              <p style={{
                fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
                fontWeight: 700,
                color: 'white',
                textAlign: 'center',
                marginBottom: 36,
                lineHeight: 1.4,
              }}>
                {q.question}
              </p>

              {/* Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {q.options.map((opt, i) => {
                  const isSelected = selectedAnswers[currentQ] === opt;
                  return (
                    <motion.button
                      key={opt}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      whileHover={{ x: 8, scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleAnswer(opt)}
                      style={{
                        background: isSelected
                          ? 'linear-gradient(135deg, rgba(236,72,153,0.3), rgba(139,92,246,0.3))'
                          : 'rgba(255,255,255,0.05)',
                        border: isSelected
                          ? '1px solid rgba(236,72,153,0.6)'
                          : '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 14,
                        padding: '16px 24px',
                        color: isSelected ? '#f9a8d4' : '#e2e8f0',
                        fontSize: '1rem',
                        fontWeight: 500,
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s ease',
                        fontFamily: "'Inter', sans-serif",
                        boxShadow: isSelected ? '0 0 20px rgba(236,72,153,0.2)' : 'none',
                      }}
                    >
                      {opt}
                    </motion.button>
                  );
                })}
              </div>

              {/* Question counter */}
              <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem', marginTop: 24, marginBottom: 0 }}>
                {currentQ + 1} / {QUESTIONS.length}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="done"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 150 }}
              style={{
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(236,72,153,0.2)',
                borderRadius: 28,
                padding: '60px 36px',
                textAlign: 'center',
                boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 60px rgba(236,72,153,0.08)',
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ fontSize: '4rem', marginBottom: 24 }}
              >
                💖
              </motion.div>
              <h3 style={{
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: 800,
                color: 'white',
                marginBottom: 16,
              }}>
                That's exactly what I thought! 🌟
              </h3>
              <p style={{ color: '#c4b5fd', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: 32 }}>
                You answered every single question perfectly —<br />
                just like you do everything else in life. 💕
              </p>
              <button className="fd-next-btn" onClick={onComplete}>
                Continue ✨
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default FriendshipQuestions;
