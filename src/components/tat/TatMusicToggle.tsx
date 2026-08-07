import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  enabled: boolean;
  onToggle: () => void;
}

const TatMusicToggle = ({ enabled, onToggle }: Props) => {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      onClick={onToggle}
      title={enabled ? 'Mute Ambiance' : 'Play Ambiance'}
      style={{
        position: 'fixed',
        top: 24,
        right: 24,
        zIndex: 9999,
        background: enabled
          ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(236, 72, 153, 0.25))'
          : 'rgba(255, 255, 255, 0.06)',
        backdropFilter: 'blur(16px)',
        border: enabled
          ? '1px solid rgba(245, 158, 11, 0.6)'
          : '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: 100,
        padding: '10px 18px',
        color: enabled ? '#fbbf24' : 'rgba(255, 255, 255, 0.7)',
        fontSize: '0.85rem',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        cursor: 'pointer',
        boxShadow: enabled
          ? '0 0 20px rgba(245, 158, 11, 0.4), 0 4px 12px rgba(0, 0, 0, 0.3)'
          : '0 4px 12px rgba(0, 0, 0, 0.2)',
        transition: 'all 0.3s ease',
      }}
    >
      {enabled ? (
        <>
          <Volume2 size={16} className="animate-pulse" />
          <span>Ambiance On 🎵</span>
        </>
      ) : (
        <>
          <VolumeX size={16} />
          <span>Music Off 🔇</span>
        </>
      )}
    </motion.button>
  );
};

export default TatMusicToggle;
