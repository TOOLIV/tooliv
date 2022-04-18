import React from "react";
import { icons } from "../../shared/icons";
import { iconsTypes, largeIconTypes } from "../../types/common/iconsTypes";

const LargeIcons = ({ icon }: iconsTypes) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width="30"
      height="30"
      xmlns="http:www.w3.org/2000/svg"
      fill="#868E96"
    >
      {icons[icon]}
    </svg>
  );
};

export default LargeIcons;
