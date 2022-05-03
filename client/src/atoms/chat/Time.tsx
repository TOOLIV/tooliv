import styled from '@emotion/styled';
import React from 'react';
import { colors } from 'shared/color';

const Container = styled.div`
  width: 400px;
  color: ${colors.gray400};
`;

interface TimeProps {
  time: string;
}
const Time = ({ time }: TimeProps) => {
  return <Container>{time}</Container>;
};

export default Time;
