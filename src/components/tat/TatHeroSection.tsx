import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Trophy, BookOpen, Flame, Star, ArrowDown, Heart } from 'lucide-react';
import gsap from 'gsap';

interface Props {
  onNext: () => void;
}

const TatHeroSection = ({ onNext }: Props) => {
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Badge pop animation
      gsap.fromTo(
        badgeRef.current,
        { opacity: 0, scale: 0.7, y: -20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: 'back.out(1.8)' }
      );

      // Title reveal
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: 'power3.out' }
      );

      // Staggered cards entrance
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: 0.45,
            stagger: 0.15,
            ease: 'back.out(1.5)',
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const highlights = [
    { icon: <BookOpen size={22} color="#fbbf24" />, number: "7-8 Months", title: "Hard Work & Prep", desc: "Non-stop dedication day & night" },
    { icon: <Flame size={22} color="#f43f5e" />, number: "240+ Days", title: "Unstoppable Focus", desc: "Pushing through every challenge" },
    { icon: <Star size={22} color="#a855f7" />, number: "100%", title: "Mind & Passion", desc: "Built for teaching excellence" },
    { icon: <Trophy size={22} color="#34d399" />, number: "TAT Exam", title: "Victory Ahead 🎓", desc: "Your time to shine bright!" },
  ];

  return (
    <section
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 24px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 2,
      }}
    >
      {/* Glow Effects */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          maxWidth: 600,
          height: 350,
          background: 'radial-gradient(ellipse, rgba(245, 158, 11, 0.18) 0%, rgba(236, 72, 153, 0.12) 40%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 900, width: '100%' }}>
        {/* Animated Badge */}
        <div
          ref={badgeRef}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(236, 72, 153, 0.15))',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            borderRadius: 100,
            padding: '8px 24px',
            fontSize: '0.88rem',
            fontWeight: 700,
            color: '#fbbf24',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: 28,
            boxShadow: '0 0 30px rgba(245, 158, 11, 0.25)',
          }}
        >
          <Sparkles size={16} />
          <span>7-8 Months of Dedication & Perseverance</span>
          <Sparkles size={16} />
        </div>

        {/* Heading */}
        <h1
          ref={titleRef}
          style={{
            fontSize: 'clamp(2.5rem, 6.5vw, 4.5rem)',
            fontWeight: 900,
            lineHeight: 1.15,
            margin: '0 0 24px',
            color: '#ffffff',
            letterSpacing: '-0.02em',
          }}
        >
          Best of Luck for Your <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #fbbf24 0%, #f43f5e 50%, #c084fc 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            TAT Exam, My Bestie! 🎓✨
          </span>
        </h1>

        {/* Paragraph */}
        <p
          style={{
            fontSize: 'clamp(1.05rem, 2.2vw, 1.3rem)',
            color: 'rgba(255, 255, 255, 0.82)',
            maxWidth: 720,
            margin: '0 auto 48px',
            lineHeight: 1.7,
            fontWeight: 400,
          }}
        >
          After <strong style={{ color: '#fbbf24', fontWeight: 700 }}>7 to 8 long months</strong> of tireless preparation, countless late nights, and sacrifices — the big day has finally arrived. You have put in the work, mastered the syllabus, and built incredible knowledge. Walk in with maximum confidence because victory is already yours! 🌟💪
        </p>

        {/* Highlight Cards */}
        <div
          ref={cardsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
            gap: 18,
            marginBottom: 48,
          }}
        >
          {highlights.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6, scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 22,
                padding: '24px 20px',
                textAlign: 'center',
                boxShadow: '0 12px 36px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 255, 255, 0.02)',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  padding: 12,
                  borderRadius: 16,
                  background: 'rgba(255, 255, 255, 0.06)',
                  marginBottom: 14,
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                {item.icon}
              </div>
              <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#ffffff', marginBottom: 4 }}>
                {item.number}
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fbbf24', marginBottom: 6 }}>
                {item.title}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                {item.desc}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action Button */}
        <motion.button
          whileHover={{ scale: 1.06, y: -4 }}
          whileTap={{ scale: 0.96 }}
          onClick={onNext}
          className="fd-next-btn"
          style={{
            background: 'linear-gradient(135deg, #f59e0b, #ec4899, #8b5cf6)',
            boxShadow: '0 0 40px rgba(245, 158, 11, 0.45), 0 10px 30px rgba(0, 0, 0, 0.4)',
            fontSize: '1.05rem',
            padding: '16px 40px',
          }}
        >
          <Heart size={18} fill="white" />
          <span>Read My Special Message For You 💌</span>
          <ArrowDown size={18} />
        </motion.button>
      </div>
    </section>
  );
};

export default TatHeroSection;
