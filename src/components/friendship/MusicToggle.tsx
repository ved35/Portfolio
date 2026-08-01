import { Music, VolumeX } from 'lucide-react';

interface MusicToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

const MusicToggle = ({ enabled, onToggle }: MusicToggleProps) => {
  return (
    <button
      onClick={onToggle}
      title={enabled ? 'Mute music' : 'Play music'}
      style={{
        position: 'fixed',
        top: 20,
        right: 20,
        zIndex: 1000,
        width: 48,
        height: 48,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.06)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.12)',
        color: enabled ? '#ec4899' : '#a78bfa',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
        boxShadow: enabled ? '0 0 20px rgba(236,72,153,0.4)' : '0 4px 20px rgba(0,0,0,0.3)',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.1)';
        (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 25px rgba(167,139,250,0.5)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
        (e.currentTarget as HTMLButtonElement).style.boxShadow = enabled
          ? '0 0 20px rgba(236,72,153,0.4)'
          : '0 4px 20px rgba(0,0,0,0.3)';
      }}
    >
      {enabled ? (
        <Music size={20} style={{ animation: 'spin 3s linear infinite' }} />
      ) : (
        <VolumeX size={20} />
      )}
      <style>{`
        @keyframes spin { from { rotate: 0deg; } to { rotate: 360deg; } }
      `}</style>
    </button>
  );
};

export default MusicToggle;
