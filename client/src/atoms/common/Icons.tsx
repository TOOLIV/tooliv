import styled from '@emotion/styled';
import React from 'react';
import { colors } from '../../shared/color';
import { icons } from '../../shared/icons';
import { iconsTypes } from '../../types/common/iconsTypes';

const Icon = styled.svg<{ onClick?: () => void }>`
  cursor: ${(props) => (props.onClick ? 'pointer' : 'default')};
`;
const Icons = ({
  icon,
  color,
  width = '16',
  height = '16',
  onClick,
}: iconsTypes) => {
  return (
    <Icon
      viewBox="0 0 24 24"
      width={width}
      height={height}
      xmlns="http:www.w3.org/2000/svg"
      fill={color ? colors[color] : '#868E96'}
      onClick={onClick}
    >
      {icons[icon]}
    </Icon>
  );
};

export default Icons;
