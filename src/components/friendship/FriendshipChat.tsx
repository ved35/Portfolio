import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ScriptMsg {
  id: number;
  text: string;
  delay: number;
  replies?: string[];
}

const CHAT_SCRIPT: ScriptMsg[] = [
  { id: 1, text: 'I have a confession… 👀', delay: 0, replies: [] },
  { id: 2, text: 'You are officially my favorite troublemaker ❤️', delay: 1200, replies: ['Aww stop it 😂', 'I knew it!', 'I accept this title 👑'] },
  { id: 3, text: 'Bestie? More like partner in crime 😏', delay: 0, replies: ['Always & forever', "Couldn't have said it better", 'We ride together 🤝'] },
  { id: 4, text: 'Honestly... you make every day way more fun 💫', delay: 800, replies: ['You too 💕', 'Same bestie same', 'My heart 🥹'] },
  { id: 5, text: 'Happy Friendship Day! I\'m so glad you exist 🎉', delay: 1000, replies: ['Happy Friendship Day! 💙', 'Love you bestie! 💖', 'Forever grateful 🌟'] },
];

// A single timeline entry — either a bestie message or user reply
type TimelineEvent =
  | { kind: 'them'; id: number; text: string }
  | { kind: 'me'; id: number; text: string };

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

interface FriendshipChatProps {
  isActive: boolean;
  onComplete: () => void;
}

const FriendshipChat = ({ isActive, onComplete }: FriendshipChatProps) => {
  // Single chronological timeline: bestie msgs + user replies in order
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [awaitingReplyFor, setAwaitingReplyFor] = useState<number | null>(null);
  const [chatDone, setChatDone] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Drive the chat forward one step at a time
  useEffect(() => {
    if (!isActive || awaitingReplyFor !== null) return; // wait if user needs to reply
    if (currentStep >= CHAT_SCRIPT.length) {
      setChatDone(true);
      return;
    }

    const msg = CHAT_SCRIPT[currentStep];

    // Show typing indicator
    setIsTyping(true);
    const timer = setTimeout(() => {
      setIsTyping(false);
      // Append bestie message to timeline
      setTimeline(prev => [...prev, { kind: 'them', id: msg.id, text: msg.text }]);

      if (msg.replies && msg.replies.length > 0) {
        // Pause and wait for user to pick a reply
        setAwaitingReplyFor(msg.id);
      } else {
        // No reply needed, advance after short pause
        setTimeout(() => setCurrentStep(s => s + 1), 600);
      }
    }, msg.delay + 1200);

    return () => clearTimeout(timer);
  }, [isActive, currentStep, awaitingReplyFor]);

  // Auto-scroll to bottom whenever timeline changes
  useEffect(() => {
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 80);
  }, [timeline, isTyping, awaitingReplyFor]);

  const handleReply = (reply: string) => {
    // 1. Add user's reply IMMEDIATELY to timeline (after the bestie msg they replied to)
    setTimeline(prev => [...prev, { kind: 'me', id: Date.now(), text: reply }]);
    setAwaitingReplyFor(null);
    // 2. Advance to next bestie message after a short pause
    setTimeout(() => setCurrentStep(s => s + 1), 700);
  };

  const currentReplies =
    awaitingReplyFor !== null
      ? CHAT_SCRIPT.find(m => m.id === awaitingReplyFor)?.replies ?? []
      : [];

  return (
    <section
      style={{
        padding: '60px 24px 24px',
        maxWidth: 680,
        margin: '0 auto',
        width: '100%',
        position: 'relative',
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isActive ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        style={{ textAlign: 'center', marginBottom: 32 }}
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
          marginBottom: 16,
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
        animate={isActive ? { opacity: 1, y: 0 } : {}}
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
        {/* Chat header bar */}
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <div style={{
            width: 38,
            height: 38,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.1rem',
          }}>
            💖
          </div>
          <div>
            <p style={{ margin: 0, fontWeight: 700, color: 'white', fontSize: '0.95rem' }}>Your Bestie</p>
            <p style={{ margin: 0, color: '#4ade80', fontSize: '0.75rem' }}>● Online</p>
          </div>
        </div>

        {/* ── Unified timeline messages ── */}
        <div style={{
          padding: '20px 20px 12px',
          minHeight: 280,
          maxHeight: 360,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}>
          <AnimatePresence initial={false}>
            {timeline.map(event => {
              const isMe = event.kind === 'me';
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 14, scale: 0.93 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                  style={{ display: 'flex', justifyContent: isMe ? 'flex-end' : 'flex-start' }}
                >
                  <div style={{
                    maxWidth: '78%',
                    background: isMe
                      ? 'linear-gradient(135deg, #ec4899, #8b5cf6)'
                      : 'rgba(255,255,255,0.08)',
                    borderRadius: isMe ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                    padding: '11px 18px',
                    color: 'white',
                    fontSize: '0.95rem',
                    lineHeight: 1.5,
                    boxShadow: isMe
                      ? '0 4px 20px rgba(236,72,153,0.3)'
                      : '0 4px 20px rgba(0,0,0,0.2)',
                    border: isMe ? 'none' : '1px solid rgba(255,255,255,0.08)',
                  }}>
                    {event.text}
                  </div>
                </motion.div>
              );
            })}

            {/* Typing indicator */}
            {isTyping && (
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

        {/* Reply options — appear below current timeline */}
        <AnimatePresence>
          {awaitingReplyFor !== null && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3 }}
              style={{
                borderTop: '1px solid rgba(255,255,255,0.06)',
                padding: '14px 20px',
                display: 'flex',
                gap: 10,
                flexWrap: 'wrap',
              }}
            >
              {currentReplies.map((r, i) => (
                <motion.button
                  key={r}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleReply(r)}
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

      {/* Continue button after chat finishes */}
      {chatDone && (
        <div style={{ textAlign: 'center', marginTop: 24, animation: 'fdSlideUp 0.6s ease forwards' }}>
          <button className="fd-next-btn" onClick={onComplete}>
            Continue 💬
          </button>
        </div>
      )}
    </section>
  );
};

export default FriendshipChat;
