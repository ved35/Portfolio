import { useState, useCallback } from 'react';
import PinLock from '../components/PinLock';
import CelebrationEntry from '../components/CelebrationEntry';
import CakeCutting from '../components/CakeCutting';
import HeartfeltMessage from '../components/HeartfeltMessage';
import FriendshipGifts from '../components/FriendshipGifts';
import HeartwarmingLetter from '../components/HeartwarmingLetter';
import ForeverPage from '../components/ForeverPage';

const BirthdayPage = () => {
  const [currentScreen, setCurrentScreen] = useState(0);

  const goToScreen = useCallback((screen: number) => {
    setCurrentScreen(screen);
  }, []);

  const handleReplay = useCallback(() => {
    setCurrentScreen(0);
  }, []);

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '430px',
        margin: '0 auto',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {currentScreen === 0 && (
        <PinLock onSuccess={() => goToScreen(1)} />
      )}
      {currentScreen === 1 && (
        <CelebrationEntry onContinue={() => goToScreen(2)} />
      )}
      {currentScreen === 2 && (
        <CakeCutting onContinue={() => goToScreen(3)} />
      )}
      {currentScreen === 3 && (
        <HeartfeltMessage onContinue={() => goToScreen(4)} />
      )}
      {currentScreen === 4 && (
        <FriendshipGifts onContinue={() => goToScreen(5)} />
      )}
      {currentScreen === 5 && (
        <HeartwarmingLetter onContinue={() => goToScreen(6)} />
      )}
      {currentScreen === 6 && (
        <ForeverPage onReplay={handleReplay} />
      )}
    </div>
  );
};

export default BirthdayPage;
