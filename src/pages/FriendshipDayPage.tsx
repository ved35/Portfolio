import { useEffect, useRef, useState } from 'react';
import FriendshipHero from '../components/friendship/FriendshipHero';
import FriendshipQuestions from '../components/friendship/FriendshipQuestions';
import FriendshipChat from '../components/friendship/FriendshipChat';
import FriendshipTimeline from '../components/friendship/FriendshipTimeline';
import FriendshipGift from '../components/friendship/FriendshipGift';
import FriendshipFinalMessage from '../components/friendship/FriendshipFinalMessage';
import FriendshipCelebration from '../components/friendship/FriendshipCelebration';
import MusicToggle from '../components/friendship/MusicToggle';
import CursorGlow from '../components/friendship/CursorGlow';

const FriendshipDayPage = () => {
  const [musicEnabled, setMusicEnabled] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pageRef.current) {
      pageRef.current.style.opacity = '0';
      pageRef.current.style.transform = 'scale(0.98)';
      const t = setTimeout(() => {
        if (pageRef.current) {
          pageRef.current.style.transition = 'opacity 1.2s ease, transform 1.2s ease';
          pageRef.current.style.opacity = '1';
          pageRef.current.style.transform = 'scale(1)';
        }
      }, 50);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <div
      ref={pageRef}
      style={{
        background: 'linear-gradient(135deg, #0a0015 0%, #0d0025 25%, #0a0a2e 50%, #0d0020 75%, #0a0015 100%)',
        minHeight: '100vh',
        overflowX: 'hidden',
        position: 'relative',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Ambient background blobs */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div className="fd-blob fd-blob-1" />
        <div className="fd-blob fd-blob-2" />
        <div className="fd-blob fd-blob-3" />
      </div>

      <CursorGlow />
      <MusicToggle enabled={musicEnabled} onToggle={() => setMusicEnabled(p => !p)} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <FriendshipHero />
        <FriendshipQuestions />
        <FriendshipChat />
        <FriendshipTimeline />
        <FriendshipGift />
        <FriendshipFinalMessage />
        <FriendshipCelebration musicEnabled={musicEnabled} />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Dancing+Script:wght@700&family=Pacifico&display=swap');
        * { box-sizing: border-box; }
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
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg,#ec4899,#8b5cf6);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default FriendshipDayPage;
