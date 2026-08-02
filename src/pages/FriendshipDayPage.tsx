import { useState, useCallback } from 'react';
import FriendshipHero from '../components/friendship/FriendshipHero';
import FriendshipQuestions from '../components/friendship/FriendshipQuestions';
import FriendshipChat from '../components/friendship/FriendshipChat';
import FriendshipTimeline from '../components/friendship/FriendshipTimeline';
import FriendshipGift from '../components/friendship/FriendshipGift';
import FriendshipFinalMessage from '../components/friendship/FriendshipFinalMessage';
import FriendshipCelebration from '../components/friendship/FriendshipCelebration';
import MusicToggle from '../components/friendship/MusicToggle';
import CursorGlow from '../components/friendship/CursorGlow';

const TOTAL_SECTIONS = 7;

const FriendshipDayPage = () => {
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goNext = useCallback(() => {
    if (isTransitioning || currentSection >= TOTAL_SECTIONS - 1) return;
    setIsTransitioning(true);
    setCurrentSection(s => s + 1);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning, currentSection]);

  const sections = [
    <FriendshipHero key="hero" isActive={true} onComplete={goNext} />,
    <FriendshipQuestions key="questions" isActive={true} onComplete={goNext} />,
    <FriendshipChat key="chat" isActive={true} onComplete={goNext} />,
    <FriendshipTimeline key="timeline" isActive={true} onComplete={goNext} />,
    <FriendshipGift key="gift" isActive={true} onComplete={goNext} />,
    <FriendshipFinalMessage key="final" isActive={true} onComplete={goNext} />,
    <FriendshipCelebration key="celebration" isActive={true} musicEnabled={musicEnabled} />,
  ];

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #0a0015 0%, #0d0025 25%, #0a0a2e 50%, #0d0020 75%, #0a0015 100%)',
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Ambient background blobs — always visible */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div className="fd-blob fd-blob-1" />
        <div className="fd-blob fd-blob-2" />
        <div className="fd-blob fd-blob-3" />
      </div>

      <CursorGlow />
      <MusicToggle enabled={musicEnabled} onToggle={() => setMusicEnabled(p => !p)} />

      {/* Progress dots */}
      <div style={{
        position: 'fixed',
        right: 20,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}>
        {Array.from({ length: TOTAL_SECTIONS }).map((_, i) => (
          <div
            key={i}
            style={{
              width: i === currentSection ? 10 : 6,
              height: i === currentSection ? 10 : 6,
              borderRadius: '50%',
              background: i <= currentSection
                ? 'linear-gradient(135deg, #ec4899, #8b5cf6)'
                : 'rgba(255,255,255,0.15)',
              transition: 'all 0.4s ease',
              boxShadow: i === currentSection ? '0 0 12px rgba(236,72,153,0.8)' : 'none',
              flexShrink: 0,
            }}
          />
        ))}
      </div>

      {/* Full-screen section container — only active section rendered */}
      <div
        key={currentSection}
        className={`fd-section-enter${isTransitioning ? ' fd-transitioning' : ''}`}
        style={{
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
          animation: 'fdPageIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        }}
      >
        {sections[currentSection]}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Dancing+Script:wght@700&family=Pacifico&display=swap');
        * { box-sizing: border-box; }

        @keyframes fdPageIn {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fdSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Next button — used across all sections */
        .fd-next-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #ec4899, #8b5cf6);
          border: none;
          border-radius: 100px;
          padding: 14px 36px;
          color: white;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          letter-spacing: 0.02em;
          box-shadow: 0 0 30px rgba(236,72,153,0.4), 0 8px 24px rgba(0,0,0,0.3);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          margin-top: 28px;
        }
        .fd-next-btn:hover {
          transform: translateY(-3px) scale(1.04);
          box-shadow: 0 0 40px rgba(236,72,153,0.6), 0 12px 32px rgba(0,0,0,0.3);
        }
        .fd-next-btn:active { transform: scale(0.97); }

        .fd-blob { position: absolute; border-radius: 50%; }
        .fd-blob-1 {
          top: -20%; left: -10%; width: 55%; height: 55%;
          background: radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%);
          animation: blobFloat1 22s ease-in-out infinite;
        }
        .fd-blob-2 {
          bottom: 5%; right: -10%; width: 45%; height: 45%;
          background: radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%);
          animation: blobFloat2 28s ease-in-out infinite;
        }
        .fd-blob-3 {
          top: 40%; left: 25%; width: 50%; height: 50%;
          background: radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 70%);
          animation: blobFloat3 35s ease-in-out infinite;
        }
        @keyframes blobFloat1 {
          0%,100%{transform:translate(0,0) scale(1)}
          33%{transform:translate(3%,5%) scale(1.06)}
          66%{transform:translate(-2%,3%) scale(0.97)}
        }
        @keyframes blobFloat2 {
          0%,100%{transform:translate(0,0) scale(1)}
          33%{transform:translate(-4%,-3%) scale(1.08)}
          66%{transform:translate(2%,-5%) scale(0.95)}
        }
        @keyframes blobFloat3 {
          0%,100%{transform:translate(0,0) scale(1)}
          50%{transform:translate(-3%,4%) scale(1.1)}
        }
        @keyframes blink { 50% { opacity: 0; } }
      `}</style>
    </div>
  );
};

export default FriendshipDayPage;
