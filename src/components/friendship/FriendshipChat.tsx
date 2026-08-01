import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: number;
  from: 'them' | 'me';
  text: string;
  delay: number;
  replies?: string[];
}

const CHAT_SCRIPT: Message[] = [
  { id: 1, from: 'them', text: 'I have a confession… 👀', delay: 0, replies: [] },
  { id: 2, from: 'them', text: 'You are officially my favorite troublemaker ❤️', delay: 1200, replies: ['Aww stop it 😂', 'I knew it!', 'I accept this title 👑'] },
  { id: 3, from: 'them', text: 'Bestie? More like partner in crime 😏', delay: 0, replies: ['Always & forever', 'Couldn\'t have said it better', 'We ride together 🤝'] },
  { id: 4, from: 'them', text: 'Honestly... you make every day way more fun 💫', delay: 800, replies: ['You too 💕', 'Same bestie same', 'My heart 🥹'] },
  { id: 5, from: 'them', text: 'Happy Friendship Day! I\'m so glad you exist 🎉', delay: 1000, replies: ['Happy Friendship Day! 💙', 'Love you bestie! 💖', 'Forever grateful 🌟'] },
];

const TypingBubble = () => (
  <div style={{ display: 'flex', gap: 4, alignItems: 'center', padding: '12px 18px' }}>
    {[0, 1, 2].map(i => (
      <motion.div
        key={i}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
        style={{ width: 8, height: 8, borderRadius: '50%', background: '#a78bfa' }}
      />
    ))}
  </div>
);

const useScrollReveal = (threshold = 0.15) => {
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

const FriendshipChat = () => {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [typingId, setTypingId] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [pickedReply, setPickedReply] = useState<Record<number, string>>({});
  const [showReplies, setShowReplies] = useState<number | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { ref, visible } = useScrollReveal();

  useEffect(() => {
    if (!visible || currentStep >= CHAT_SCRIPT.length) return;
    const msg = CHAT_SCRIPT[currentStep];
    const baseDelay = msg.delay;

    setTypingId(msg.id);
    const timer = setTimeout(() => {
      setTypingId(null);
      setVisibleMessages(p => [...p, msg.id]);
      if (msg.replies && msg.replies.length > 0) {
        setShowReplies(msg.id);
      } else {
        setTimeout(() => setCurrentStep(s => s + 1), 600);
      }
    }, baseDelay + 1400);

    return () => clearTimeout(timer);
  }, [visible, currentStep]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [visibleMessages, typingId]);

  const handleReply = (msgId: number, reply: string) => {
    setPickedReply(p => ({ ...p, [msgId]: reply }));
    setShowReplies(null);
    setTimeout(() => setCurrentStep(s => s + 1), 800);
  };

  return (
    <section
      ref={ref}
      style={{
        padding: '80px 24px',
        maxWidth: 680,
        margin: '0 auto',
        position: 'relative',
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        style={{ textAlign: 'center', marginBottom: 48 }}
      >
        <div style={{
          display: 'inline-block',
          background: 'rgba(96,165,250,0.1)',
          border: '1px solid rgba(96,165,250,0.25)',
          borderRadius: 100,
          padding: '6px 18px',
          fontSize: '0.8rem',
          color: '#93c5fd',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: 20,
        }}>
          ✦ Chat History ✦
        </div>
        <h2 style={{
          fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
          fontWeight: 800,
          background: 'linear-gradient(135deg, #93c5fd, #c4b5fd)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          margin: 0,
        }}>
          A little conversation... 💬
        </h2>
      </motion.div>

      {/* Chat window */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
        style={{
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 24,
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        }}
      >
        {/* Chat header */}
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
          }}>
            💖
          </div>
          <div>
            <p style={{ margin: 0, fontWeight: 700, color: 'white', fontSize: '0.95rem' }}>Your Bestie</p>
            <p style={{ margin: 0, color: '#4ade80', fontSize: '0.75rem' }}>● Online</p>
          </div>
        </div>

        {/* Messages */}
        <div style={{
          padding: '24px 20px',
          minHeight: 360,
          maxHeight: 480,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}>
          <AnimatePresence>
            {visibleMessages.map(id => {
              const msg = CHAT_SCRIPT.find(m => m.id === id)!;
              const isMe = msg.from === 'me';
              return (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 16, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  style={{
                    display: 'flex',
                    justifyContent: isMe ? 'flex-end' : 'flex-start',
                  }}
                >
                  <div style={{
                    maxWidth: '78%',
                    background: isMe
                      ? 'linear-gradient(135deg, #ec4899, #8b5cf6)'
                      : 'rgba(255,255,255,0.08)',
                    borderRadius: isMe ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                    padding: '12px 18px',
                    color: 'white',
                    fontSize: '0.95rem',
                    lineHeight: 1.5,
                    boxShadow: isMe
                      ? '0 4px 20px rgba(236,72,153,0.3)'
                      : '0 4px 20px rgba(0,0,0,0.2)',
                    border: isMe ? 'none' : '1px solid rgba(255,255,255,0.08)',
                  }}>
                    {msg.text}
                  </div>
                </motion.div>
              );
            })}

            {/* User replied messages */}
            {Object.entries(pickedReply).map(([msgId, reply]) => (
              <motion.div
                key={`reply-${msgId}`}
                initial={{ opacity: 0, y: 16, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                style={{ display: 'flex', justifyContent: 'flex-end' }}
              >
                <div style={{
                  maxWidth: '78%',
                  background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
                  borderRadius: '20px 20px 4px 20px',
                  padding: '12px 18px',
                  color: 'white',
                  fontSize: '0.95rem',
                  boxShadow: '0 4px 20px rgba(236,72,153,0.3)',
                }}>
                  {reply}
                </div>
              </motion.div>
            ))}

            {/* Typing bubble */}
            {typingId && (
              <motion.div
                key="typing"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{ display: 'flex', justifyContent: 'flex-start' }}
              >
                <div style={{
                  background: 'rgba(255,255,255,0.08)',
                  borderRadius: '20px 20px 20px 4px',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}>
                  <TypingBubble />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={chatEndRef} />
        </div>

        {/* Reply options */}
        <AnimatePresence>
          {showReplies !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              style={{
                borderTop: '1px solid rgba(255,255,255,0.06)',
                padding: '16px 20px',
                display: 'flex',
                gap: 10,
                flexWrap: 'wrap',
              }}
            >
              {CHAT_SCRIPT.find(m => m.id === showReplies)?.replies?.map((r) => (
                <motion.button
                  key={r}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleReply(showReplies!, r)}
                  style={{
                    background: 'rgba(236,72,153,0.1)',
                    border: '1px solid rgba(236,72,153,0.3)',
                    borderRadius: 100,
                    padding: '8px 20px',
                    color: '#f9a8d4',
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    transition: 'all 0.2s',
                  }}
                >
                  {r}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default FriendshipChat;
