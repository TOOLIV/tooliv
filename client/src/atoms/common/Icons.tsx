import React from 'react';
import { colors } from '../../shared/color';
import { icons } from '../../shared/icons';
import { iconsTypes } from '../../types/common/iconsTypes';

const Icons = ({
  icon,
  color,
  width = '16',
  height = '16',
  onClick,
}: iconsTypes) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width={width}
      height={height}
      xmlns="http:www.w3.org/2000/svg"
      fill={color ? colors[color] : '#868E96'}
      onClick={onClick}
    >
      {icons[icon]}
    </svg>
  );
};

export default Icons;
