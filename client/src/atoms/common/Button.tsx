import styled from '@emotion/styled';
import React from 'react';
import { buttonTypes } from '../../types/common/buttonTypes';

const Container = styled.div<{ width?: string; height?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.width ? `${props.width}px` : '182px')};
  height: ${(props) => (props.height ? `${props.height}px` : '48px')};
  padding: 10px 13px;
  background-color: ${(props) => props.theme.pointColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
`;

const Button = ({ width, height, text, onClick }: buttonTypes) => {
  return (
    <Container width={width} height={height} onClick={onClick}>
      {text}
    </Container>
  );
};

export default Button;
