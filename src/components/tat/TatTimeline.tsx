import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, CheckCircle2, ChevronRight, Sparkles, BookOpen, Clock, Heart, Award } from 'lucide-react';

interface Props {
  isActive: boolean;
  onComplete: () => void;
}

interface Chapter {
  id: number;
  period: string;
  badge: string;
  title: string;
  subtitle: string;
  details: string[];
  quote: string;
  color: string;
  icon: React.ReactNode;
}

const chapters: Chapter[] = [
  {
    id: 1,
    period: 'Months 1 - 2',
    badge: 'Phase I: The Spark',
    title: 'Defining the Dream & Syllabus',
    subtitle: 'Setting up target study hours, gathering reference books, and making a promise to give 100%.',
    details: [
      'Built a structured daily schedule with unwavering discipline.',
      'Gathered all syllabus topics and analyzed previous year questions.',
      'Ignited the unstoppable passion to become a licensed teacher!'
    ],
    quote: '"Every master was once a beginner. You took the first leap with courage!"',
    color: '#fbbf24',
    icon: <Sparkles size={24} color="#fbbf24" />,
  },
  {
    id: 2,
    period: 'Months 3 - 4',
    badge: 'Phase II: The Grind',
    title: 'Deep Diving & Note Making',
    subtitle: 'Hours spent mastering pedagogy, psychology, reasoning, and core subject topics.',
    details: [
      'Created colorful, high-retention handwritten revision notes.',
      'Solved hundreds of practice questions every single week.',
      'Balanced life and prep like a absolute champion.'
    ],
    quote: '"Silent hard work in the dark prepares you for the bright spotlight!"',
    color: '#ec4899',
    icon: <BookOpen size={24} color="#ec4899" />,
  },
  {
    id: 3,
    period: 'Months 5 - 6',
    badge: 'Phase III: Resilience',
    title: 'Conquering Tiredness & Mock Tests',
    subtitle: 'When fatigue hit, you pushed even harder, analyzing mistakes and improving speed.',
    details: [
      'Gave full-length mock exams under strict timer conditions.',
      'Turned weak spots into absolute strengths through revision.',
      'Remained steady and focused even when the workload was high.'
    ],
    quote: '"Stars cannot shine without darkness. Your resilience shone brightest!"',
    color: '#a855f7',
    icon: <Clock size={24} color="#a855f7" />,
  },
  {
    id: 4,
    period: 'Months 7 - 8',
    badge: 'Phase IV: Peak Readiness',
    title: 'Final Revisions & Absolute Mastery',
    subtitle: 'Fine-tuning memory, boosting solving speed, and stepping into peak exam confidence.',
    details: [
      'Rapid formula & theory revisions with zero stress.',
      'Achieved top scores in final practice assessments.',
      'Ready to step into the exam center as a true winner!'
    ],
    quote: '"7-8 months of preparation is about to pay off in the grandest way possible!"',
    color: '#34d399',
    icon: <Award size={24} color="#34d399" />,
  },
];

const TatTimeline = ({ onComplete }: Props) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const currentChapter = chapters[activeStep];

  return (
    <div style={{ padding: '40px 20px', maxWidth: 900, margin: '0 auto', width: '100%' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(236, 72, 153, 0.12)',
            border: '1px solid rgba(236, 72, 153, 0.3)',
            borderRadius: 100,
            padding: '6px 16px',
            fontSize: '0.8rem',
            fontWeight: 700,
            color: '#ec4899',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: 12,
          }}
        >
          <Calendar size={14} />
          <span>The 8-Month Journey</span>
        </div>
        <h2
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 800,
            color: '#ffffff',
            margin: '0 0 10px',
          }}
        >
          Your Road to Excellence 🛣️
        </h2>
        <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.95rem', margin: 0 }}>
          Click through each chapter of your 8-month preparation story!
        </p>
      </div>

      {/* Chapter Tabs */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 10,
          marginBottom: 32,
        }}
      >
        {chapters.map((ch, idx) => {
          const isSelected = activeStep === idx;
          return (
            <motion.button
              key={ch.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveStep(idx)}
              style={{
                background: isSelected
                  ? `linear-gradient(135deg, ${ch.color}25, rgba(255,255,255,0.06))`
                  : 'rgba(255, 255, 255, 0.03)',
                border: isSelected
                  ? `1.5px solid ${ch.color}`
                  : '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 16,
                padding: '14px 10px',
                color: isSelected ? ch.color : 'rgba(255, 255, 255, 0.6)',
                fontWeight: isSelected ? 700 : 500,
                cursor: 'pointer',
                textAlign: 'center',
                boxShadow: isSelected ? `0 0 20px ${ch.color}30` : 'none',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{ fontSize: '0.75rem', opacity: 0.8, marginBottom: 4 }}>{ch.period}</div>
              <div style={{ fontSize: '0.9rem', color: isSelected ? '#ffffff' : 'rgba(255,255,255,0.7)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {ch.badge.split(':')[1] || ch.badge}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Selected Chapter Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentChapter.id}
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{
            background: 'rgba(255, 255, 255, 0.04)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${currentChapter.color}40`,
            borderRadius: 24,
            padding: '36px 32px',
            boxShadow: `0 16px 48px rgba(0, 0, 0, 0.4), 0 0 30px ${currentChapter.color}15`,
            marginBottom: 36,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 16,
                background: `${currentChapter.color}20`,
                border: `1px solid ${currentChapter.color}40`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {currentChapter.icon}
            </div>
            <div>
              <span
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: currentChapter.color,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                {currentChapter.badge} ({currentChapter.period})
              </span>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', margin: '4px 0 0' }}>
                {currentChapter.title}
              </h3>
            </div>
          </div>

          <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '1.02rem', lineHeight: 1.6, marginBottom: 24 }}>
            {currentChapter.subtitle}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
            {currentChapter.details.map((detail, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <CheckCircle2 size={18} color={currentChapter.color} style={{ flexShrink: 0, marginTop: 3 }} />
                <span style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                  {detail}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              background: `linear-gradient(135deg, ${currentChapter.color}15, rgba(255, 255, 255, 0.02))`,
              borderLeft: `4px solid ${currentChapter.color}`,
              borderRadius: '0 16px 16px 0',
              padding: '16px 20px',
              color: '#ffffff',
              fontStyle: 'italic',
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <Heart size={18} color={currentChapter.color} style={{ flexShrink: 0 }} />
            <span>{currentChapter.quote}</span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
          disabled={activeStep === 0}
          style={{
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 100,
            padding: '12px 24px',
            color: activeStep === 0 ? 'rgba(255, 255, 255, 0.3)' : 'white',
            fontWeight: 600,
            cursor: activeStep === 0 ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          Previous Phase
        </button>

        {activeStep < chapters.length - 1 ? (
          <button
            onClick={() => setActiveStep(prev => Math.min(chapters.length - 1, prev + 1))}
            style={{
              background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
              border: 'none',
              borderRadius: 100,
              padding: '12px 28px',
              color: 'white',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: '0 0 20px rgba(236,72,153,0.4)',
            }}
          >
            <span>Next Phase</span>
            <ChevronRight size={16} />
          </button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onComplete}
            className="fd-next-btn"
            style={{ marginTop: 0 }}
          >
            <span>Unlock Exam Powerups ⚡</span>
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default TatTimeline;
