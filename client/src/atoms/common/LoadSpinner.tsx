import React from 'react';
import HashLoader from 'react-spinners/HashLoader';
import { colors } from 'shared/color';
const LoadSpinner = () => {
  return <HashLoader color={colors.primary} size={50} />;
};

export default LoadSpinner;
