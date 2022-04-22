import styled from '@emotion/styled';
import React from 'react';
import FunctionButton from '../../molecules/meeting/FunctionButton';

const FucntionButtonsContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const FunctionButtons = () => {
  return (
    <FucntionButtonsContainer>
      <FunctionButton icon="audioOn" />
      <FunctionButton icon="videoOn" />
      <FunctionButton icon="shareMonitor" />
      <FunctionButton icon="exit" exit />
    </FucntionButtonsContainer>
  );
};

export default FunctionButtons;
