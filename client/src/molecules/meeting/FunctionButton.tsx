import styled from '@emotion/styled';
import React from 'react';
import { functionButtonTypes } from '../../types/meeting/functionButtonTypes';
import { colors } from '../../shared/color';
import { prependOnceListener } from 'process';
import Icons from '../../atoms/common/Icons';

export const IconContainer = styled.div<{ exit?: boolean; message?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 45px;
  background-color: ${(props) =>
    props.exit ? colors['secondary'] : colors['gray300']};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  :hover {
    background-color: ${(props) =>
      props.exit ? '#EC6A6A' : colors['gray400']};
  }

  position: ${(props) => (props.message ? 'absolute' : '')};
  right: ${(props) => (props.message ? '40px' : '')};
  bottom: ${(props) => (props.message ? '30px' : '')};
`;

const FunctionButton = ({ icon, exit, onClick }: functionButtonTypes) => {
  return (
    <IconContainer exit={exit} onClick={onClick}>
      <Icons
        icon={icon}
        width="24"
        height="24"
        color={exit ? 'red700' : undefined}
      />
    </IconContainer>
  );
};

export default FunctionButton;
