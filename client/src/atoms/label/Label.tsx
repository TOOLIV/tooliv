import styled from '@emotion/styled';
import React from 'react';
export const Container = styled.label`
  display: inline-block;
  color: ${(props) => props.theme.textColor};
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 4px;
`;

type labelProps = {
  label: string;
};
const Label = ({ label }: labelProps) => {
  return <Container htmlFor="input">{label}</Container>;
};

export default Label;
