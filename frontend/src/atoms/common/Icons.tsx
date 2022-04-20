import React from 'react';
import { colors } from '../../shared/color';
import { icons } from '../../shared/icons';
import { iconsTypes } from '../../types/common/iconsTypes';

const Icons = ({ icon, color, onClick }: iconsTypes) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      xmlns="http:www.w3.org/2000/svg"
      fill={color ? colors[color] : colors['gray800']}
      onClick={onClick}
    >
      {icons[icon]}
    </svg>
  );
};

export default Icons;
