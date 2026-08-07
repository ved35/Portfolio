import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Trophy, BookOpen, Star, Flame, ArrowRight } from 'lucide-react';
import gsap from 'gsap';

interface Props {
  isActive: boolean;
  onComplete: () => void;
}

const TatHero = ({ isActive, onComplete }: Props) => {
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        badgeRef.current,
        { opacity: 0, y: -20, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.7)' }
      );

      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: 'power3.out' }
      );

      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.children,
          { opacity: 0, y: 40, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: 0.5, stagger: 0.15, ease: 'back.out(1.4)' }
        );
      }
    });

    return () => ctx.revert();
  }, [isActive]);

  const stats = [
    { icon: <BookOpen size={20} color="#fbbf24" />, number: "8 Months", label: "Relentless Prep" },
    { icon: <Flame size={20} color="#ec4899" />, number: "240+ Days", label: "Pure Consistency" },
    { icon: <Star size={20} color="#a855f7" />, number: "100%", label: "Belief & Passion" },
    { icon: <Trophy size={20} color="#34d399" />, number: "Future", label: "Star Teacher 🎓" },
  ];

  return (
    <div style={{ padding: '40px 20px', maxWidth: 900, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
      {/* Background Floating Orbs */}
      <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none', width: '100%', height: '100%', zIndex: 0 }}>
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '15%',
          width: 280,
          height: 280,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.18) 0%, transparent 70%)',
          filter: 'blur(40px)',
          animation: 'tatPulse 6s ease-in-out infinite alternate',
        }} />
        <div style={{
          position: 'absolute',
          top: '30%',
          right: '15%',
          width: 320,
          height: 320,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.18) 0%, transparent 70%)',
          filter: 'blur(50px)',
          animation: 'tatPulse 7s ease-in-out infinite alternate-reverse',
        }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Animated Badge */}
        <div
          ref={badgeRef}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(236, 72, 153, 0.15))',
            border: '1px solid rgba(245, 158, 11, 0.35)',
            borderRadius: 100,
            padding: '8px 22px',
            fontSize: '0.85rem',
            fontWeight: 700,
            color: '#fbbf24',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: 28,
            boxShadow: '0 0 25px rgba(245, 158, 11, 0.25)',
          }}
        >
          <Sparkles size={16} />
          <span>7-8 Months of Dedication & Hard Work</span>
          <Sparkles size={16} />
        </div>

        {/* Hero Title */}
        <h1
          ref={titleRef}
          style={{
            fontSize: 'clamp(2.4rem, 6vw, 4.2rem)',
            fontWeight: 900,
            lineHeight: 1.15,
            margin: '0 0 24px',
            background: 'linear-gradient(135deg, #ffffff 0%, #fef3c7 35%, #fbbf24 60%, #f43f5e 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.02em',
          }}
        >
          Best of Luck for Your <br />
          <span style={{
            background: 'linear-gradient(135deg, #fbbf24, #ec4899, #a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            TAT Exam, My Bestie! 🎓✨
          </span>
        </h1>

        {/* Subtitle / Description */}
        <p
          style={{
            fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
            color: 'rgba(255, 255, 255, 0.8)',
            maxWidth: 680,
            margin: '0 auto 48px',
            lineHeight: 1.7,
            fontWeight: 400,
          }}
        >
          You’ve spent <strong style={{ color: '#fbbf24', fontWeight: 700 }}>7 to 8 long months</strong> pushing through late nights, countless revisions, and tireless preparation. Now it’s your moment to shine! Walk in with pride and conquer every question! 🌟💪
        </p>

        {/* Stats Grid */}
        <div
          ref={statsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 16,
            maxWidth: 780,
            margin: '0 auto 48px',
          }}
        >
          {stats.map((s, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 20,
                padding: '20px 16px',
                textAlign: 'center',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{ display: 'inline-flex', padding: 10, borderRadius: 14, background: 'rgba(255, 255, 255, 0.05)', marginBottom: 12 }}>
                {s.icon}
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: 4 }}>
                {s.number}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.6)', fontWeight: 500 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.05, translateY: -3 }}
          whileTap={{ scale: 0.97 }}
          onClick={onComplete}
          className="fd-next-btn"
          style={{
            background: 'linear-gradient(135deg, #f59e0b, #ec4899, #8b5cf6)',
            boxShadow: '0 0 35px rgba(245, 158, 11, 0.4), 0 10px 30px rgba(0,0,0,0.4)',
          }}
        >
          <span>Walk Down Memory Lane 🚀</span>
          <ArrowRight size={18} />
        </motion.button>
      </div>

      <style>{`
        @keyframes tatPulse {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.15); opacity: 0.9; }
        }
      `}</style>
    </div>
  );
};

export default TatHero;
