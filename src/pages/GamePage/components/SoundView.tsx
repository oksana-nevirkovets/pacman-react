import { useState } from 'react';
import styled from 'styled-components';
import { useStore } from '../../../components/StoreContext';

export const SoundView = () => {
  const [isMuted, setIsMuted] = useState(
    Boolean(localStorage.getItem('pacman-muted'))
  );
  const store = useStore();
  const handleClick = () => {
    store.muteSounds();
    const muted = localStorage.getItem('pacman-muted');

    if (muted !== 'true') {
      setIsMuted(true);
      localStorage.setItem('pacman-muted', 'true');
    } else {
      setIsMuted(false);
      localStorage.removeItem('pacman-muted');
    }
  };
  return (
    <StyledButton onClick={handleClick}>
      {isMuted ? 'Muted' : 'Sounds'}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  font-family: BoldPixel;
  background: black;
  color: white;
  font-size: 16px;
  cursor: pointer;
  padding-top: 5px;
  border-radius: 4px;
  display: flex;
  min-width: 95px;
  justify-content: center;
  align-items: center;
  opacity: 0.6;
  transition: all 0.2s ease-in-out;
  border: 3px solid white;
  cursor: pointer;
  :hover {
    opacity: 1;
  }
`;
