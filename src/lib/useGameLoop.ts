import { Game } from './Game';
import { onTimeElapsed } from './onTimeElapsed';
import { useEffect } from 'react';

export const useGameLoop = (game: Game) => {
  const animationStep = (timestamp: number) => {
    onTimeElapsed({ game, timestamp });
    if (!game.gamePaused) {
      window.requestAnimationFrame(animationStep);
    }
  };

  useEffect(() => {
    window.requestAnimationFrame(animationStep);
    return game.stopGame;
    /* eslint-disable  react-hooks/exhaustive-deps */
  }, []);
};
