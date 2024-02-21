import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useStore } from '../../../components/StoreContext';
import { useOnClickOutside } from '../../../model/useOnClickOutside';

const options = [
  { value: '1', label: 'Level: 1' },
  { value: '2', label: 'Level: 2' },
];

export const LevelView = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const ref = useRef(null);
  const store = useStore();
  useOnClickOutside(ref, () => setIsOpen(false));

  useEffect(() => {
    store.game.speed = Number(selectedOption.value);
  }, []);

  const handleChange = (option: { value: string; label: string }) => {
    store.resetGame();
    store.game.speed = Number(option.value);
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <StyledDropdown ref={ref}>
      <StyledDropdownControl
        id="dropdown"
        isOpen={isOpen}
        onClick={() => setIsOpen(prevIsOpen => !prevIsOpen)}
      >
        {selectedOption.label}
      </StyledDropdownControl>
      {isOpen && (
        <StyledDropdownContent>
          {options.map(item => (
            <StyledDropdownItem
              key={item.value}
              onClick={() => handleChange(item)}
            >
              {item.label}
            </StyledDropdownItem>
          ))}
        </StyledDropdownContent>
      )}
    </StyledDropdown>
  );
};

const StyledDropdown = styled.div`
  position: relative;
`;

const StyledDropdownContent = styled.div`
  border: 3px solid white;
  position: absolute;
  top: 0;
  background: black;
  transform: translateY(-110%);
  width: 100%;
  border-radius: 4px;
`;

const StyledDropdownControl = styled.button<{ isOpen: boolean }>`
  font-family: BoldPixel;
  background: black;
  color: white;
  font-size: 16px;
  cursor: pointer;
  padding-top: 5px;
  border-radius: 4px;
  display: flex;
  min-width: 95px;
  justify-items: center;
  align-items: center;
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0.6')};
  transition: all 0.2s ease-in-out;
  border: 3px solid white;
  cursor: pointer;
  :hover {
    opacity: 1;
  }
`;

const StyledDropdownItem = styled.button`
  background: black;
  border: none;
  font-size: 14px;
  padding: 4px;
  font-family: BoldPixel;
  width: 100%;
  color: white;
  opacity: 0.6;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  :hover {
    opacity: 1;
  }
`;
