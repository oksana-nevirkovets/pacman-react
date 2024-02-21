import { observer } from 'mobx-react-lite';
import { useGame } from '../../../components/StoreContext';
import sound from '../../../resources/sfx/ready.mp3';
import { useEffect, useMemo } from 'react';

export const StartSound = observer(() => {
  const game = useGame();
  const startSound = useMemo(() => new Audio(sound), []);

  useEffect(() => {
    if (game.gameStarted) {
      startSound.play();
      startSound.volume = 0.5;
    }
    return () => {
      startSound.pause();
      startSound.src = ''; // Release the audio resource
    };
  }, [game.gameStarted]);

  useEffect(() => {
    if (game.gamePaused && startSound) {
      startSound.pause();
      startSound.src = '';
    }
  }, [game.gamePaused, startSound]);

  useEffect(() => {
    if (game.gameStarted) {
      startSound.muted = game.isMuted;
    }
  }, [game.isMuted, game.gameStarted]);

  return <div></div>;
});
