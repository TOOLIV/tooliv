import styled from '@emotion/styled';
import React from 'react';
import { colors } from 'shared/color';

const Container = styled.div`
  width: 400px;
  color: ${colors.gray400};
  font-size: 14px;
`;

interface TimeProps {
  time: string;
}
const Time = ({ time }: TimeProps) => {
  return (
    <Container>
      {time.slice(11, 13)}:{time.slice(14, 16)}
    </Container>
  );
};

export default Time;
