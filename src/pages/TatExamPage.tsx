import { useState, useCallback } from 'react';
import TatHeroSection from '../components/tat/TatHeroSection';
import TatMessageSection from '../components/tat/TatMessageSection';
import TatMusicToggle from '../components/tat/TatMusicToggle';
import TatCursorGlow from '../components/tat/TatCursorGlow';

const TOTAL_SECTIONS = 2;

const TatExamPage = () => {
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goNext = useCallback(() => {
    if (isTransitioning || currentSection >= TOTAL_SECTIONS - 1) return;
    setIsTransitioning(true);
    setCurrentSection(s => s + 1);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning, currentSection]);

  const goRestart = useCallback(() => {
    setIsTransitioning(true);
    setCurrentSection(0);
    setTimeout(() => setIsTransitioning(false), 600);
  }, []);

  const sections = [
    <TatHeroSection key="hero" onNext={goNext} />,
    <TatMessageSection key="message" musicEnabled={musicEnabled} onRestart={goRestart} />,
  ];

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #090014 0%, #0f0026 30%, #080a29 60%, #120024 100%)',
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        fontFamily: "'Inter', sans-serif",
        color: '#ffffff',
        overflowX: 'hidden',
      }}
    >
      {/* Ambient background glowing blobs */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div className="tat-blob tat-blob-1" />
        <div className="tat-blob tat-blob-2" />
        <div className="tat-blob tat-blob-3" />
      </div>

      {/* Interactive Cursor Glow */}
      <TatCursorGlow />

      {/* Music Ambiance Toggle */}
      <TatMusicToggle enabled={musicEnabled} onToggle={() => setMusicEnabled(p => !p)} />

      {/* 2-Step Progress Dots Indicator */}
      <div
        style={{
          position: 'fixed',
          right: 24,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 200,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        {Array.from({ length: TOTAL_SECTIONS }).map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (isTransitioning) return;
              setIsTransitioning(true);
              setCurrentSection(i);
              setTimeout(() => setIsTransitioning(false), 600);
            }}
            title={`Section ${i + 1}`}
            style={{
              width: i === currentSection ? 12 : 8,
              height: i === currentSection ? 12 : 8,
              borderRadius: '50%',
              background: i === currentSection
                ? 'linear-gradient(135deg, #fbbf24, #ec4899)'
                : 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.4s ease',
              boxShadow: i === currentSection ? '0 0 16px rgba(251, 191, 36, 0.9)' : 'none',
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Main Active Section Render */}
      <div
        key={currentSection}
        style={{
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
          animation: 'tatPageIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        }}
      >
        {sections[currentSection]}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Dancing+Script:wght@700&display=swap');
        * { box-sizing: border-box; }

        @keyframes tatPageIn {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .fd-next-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          border: none;
          border-radius: 100px;
          color: white;
          font-weight: 700;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          letter-spacing: 0.02em;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .tat-blob { position: absolute; border-radius: 50%; }
        .tat-blob-1 {
          top: -15%; left: -10%; width: 55%; height: 55%;
          background: radial-gradient(circle, rgba(245, 158, 11, 0.12) 0%, transparent 70%);
          animation: tatBlobFloat1 20s ease-in-out infinite;
        }
        .tat-blob-2 {
          bottom: -10%; right: -10%; width: 50%; height: 50%;
          background: radial-gradient(circle, rgba(236, 72, 153, 0.12) 0%, transparent 70%);
          animation: tatBlobFloat2 25s ease-in-out infinite;
        }
        .tat-blob-3 {
          top: 35%; left: 30%; width: 45%; height: 45%;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.09) 0%, transparent 70%);
          animation: tatBlobFloat3 30s ease-in-out infinite;
        }

        @keyframes tatBlobFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(4%, 6%) scale(1.08); }
        }
        @keyframes tatBlobFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-4%, -4%) scale(1.1); }
        }
        @keyframes tatBlobFloat3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-3%, 5%) scale(1.05); }
        }
      `}</style>
    </div>
  );
};

export default TatExamPage;
