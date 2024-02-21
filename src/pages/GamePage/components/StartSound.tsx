import { observer } from 'mobx-react-lite';
import { useGame } from '../../../components/StoreContext';
import sound from '../../../resources/sfx/ready.mp3';
import { useCallback, useMemo } from 'react';

export const StartSound = observer(() => {
  const game = useGame();
  const startSound = useMemo(() => new Audio(sound), []);
  const playSound = useCallback(() => startSound.play(), []);
  playSound();
  startSound.volume = 0.5;
  startSound.muted = game.isMuted || game.gamePaused;
  return <div></div>;
});
