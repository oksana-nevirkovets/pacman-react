import { Game } from './Game';
import { Ghost } from './Ghost';

export const makeGhosts = (game: Game): Ghost[] => {
  const ghosts: Ghost[] = [
    new Ghost(game),
    new Ghost(game),
    new Ghost(game),
    new Ghost(game),
  ];

  ghosts[0].ghostNumber = 0;
  ghosts[0].color = 'red';
  ghosts[0].setTileCoordinates({ x: 12, y: 11 });

  ghosts[1].ghostNumber = 1;
  ghosts[1].color = 'pink';
  ghosts[1].setTileCoordinates({ x: 13, y: 11 });

  ghosts[2].ghostNumber = 2;
  ghosts[2].color = 'cyan';
  ghosts[2].setTileCoordinates({ x: 14, y: 11 });

  ghosts[3].ghostNumber = 3;
  ghosts[3].color = 'orange';
  ghosts[3].setTileCoordinates({ x: 15, y: 11 });
  return ghosts;
};