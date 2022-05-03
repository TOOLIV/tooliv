import styled from '@emotion/styled';
import React from 'react';
import { colors } from 'shared/color';
import { colorsTypes } from 'types/common/colorsTypes';
import { buttonTypes } from '../../types/common/buttonTypes';

const Container = styled.button<{
  width?: string;
  height?: string;
  bgColor?: colorsTypes['color'];
  textColor?: colorsTypes['color'];
  disabled?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.width ? `${props.width}px` : '182px')};
  height: ${(props) => (props.height ? `${props.height}px` : '48px')};
  border: none;
  padding: 10px 13px;
  background-color: ${(props) =>
    props.disabled
      ? colors.gray300
      : props.bgColor
      ? colors[props.bgColor]
      : props.theme.pointColor};
  color: ${(props) =>
    props.textColor ? colors[props.textColor] : props.theme.textColor};
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
`;

const Button = ({
  width,
  height,
  text,
  bgColor,
  textColor,
  onClick,
  disabled = false,
}: buttonTypes) => {
  return (
    <Container
      width={width}
      height={height}
      bgColor={bgColor}
      textColor={textColor}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </Container>
  );
};

export default Button;
