import { useRef, useState } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { useGame } from '../../../components/StoreContext';
import { useOnClickOutside } from '../../../model/useOnClickOutside';

const options = [
  { value: '1', label: 'Level: 1' },
  { value: '2', label: 'Level: 2' },
];

export const LevelView = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const ref = useRef(null);
  const game = useGame();
  useOnClickOutside(ref, () => setIsOpen(false));

  const handleChange = (option: { value: string; label: string }) => {
    game.speed = Number(option.value);
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
            <StyledDropdownItem onClick={() => handleChange(item)}>
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

const StyledSelect = styled(Select)`
  opacity: 0.6;
  transition: all 0.2s ease-in-out;
  border: 3px solid white !important;
  border-radius: 4px;
  width: 100% !important;
  :hover {
    opacity: 1;
  }
  .ant-select-open {
    opacity: 1;
  }
  .ant-select-selector {
    height: 100% !important;
    font-family: BoldPixel;
    border: none !important;
    background: black !important;
    color: white;
    font-size: 16px;
    cursor: pointer;
    padding-top: 5px;
    display: flex;
    justify-items: center;
    align-items: center;

    .ant-select-selection-item {
      padding: 0 !important;
    }
  }
  .ant-select-arrow {
    display: none;
  }
`;
