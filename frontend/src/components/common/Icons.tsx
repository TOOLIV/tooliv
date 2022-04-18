import React from "react";
import { icons } from "../../shared/icons";
import { iconsTypes } from "../../types/iconsTypes";

const Icons = ({ icon }: iconsTypes) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      xmlns="http:www.w3.org/2000/svg"
      fill="#868E96"
    >
      {icons[icon]}
    </svg>
  );
};

export default Icons;
