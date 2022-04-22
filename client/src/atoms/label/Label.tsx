import styled from '@emotion/styled';
import React from 'react';
import { colors } from '../../shared/color';
export const Container = styled.label`
  color: ${colors.gray400};
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 8px;
`;

type labelProps = {
  label: string;
};
const Label = ({ label }: labelProps) => {
  return <Container htmlFor="input">{label}</Container>;
};

export default Label;
