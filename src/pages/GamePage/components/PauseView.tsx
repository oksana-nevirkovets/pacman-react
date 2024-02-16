import { useGame } from '../../../components/StoreContext';
import styled from 'styled-components';

export const PauseView = () => {
  const game = useGame();

  const handleClick = () => {
    game.gamePaused = !game.gamePaused;
  };

  return (
    <ButtonStyled id="pacman-pause" onClick={handleClick}>
      Pause
    </ButtonStyled>
  );
};

const ButtonStyled = styled.button`
  min-width: 95px;
  font-family: Joystix;
  border: 3px solid #ffff00c7;
  border-radius: 4px;
  background: transparent;
  color: #ffff00c7;
  font-size: 16px;
  height: auto;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  :hover {
    border-color: yellow;
    color: yellow;
  }
`;
