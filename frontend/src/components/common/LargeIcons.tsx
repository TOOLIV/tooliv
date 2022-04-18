import React from "react";
import { colors } from "../../shared/color";
import { icons } from "../../shared/icons";
import { largeIconTypes } from "../../types/common/iconsTypes";

const LargeIcons = ({ icon, color }: largeIconTypes) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width="30"
      height="30"
      xmlns="http:www.w3.org/2000/svg"
      fill={color ? color : colors["gray800"]}
    >
      {icons[icon]}
    </svg>
  );
};

export default LargeIcons;
