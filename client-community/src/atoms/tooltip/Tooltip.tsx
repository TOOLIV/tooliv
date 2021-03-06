import styled from '@emotion/styled';
import React from 'react';

type tooltipType = {
  name: string;
};

const Container = styled.div`
  width: 40px;
  height: 40px;
  flex: 0 0 auto;
  background-color: ${(props) => props.theme.sideBgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 10px;
  position: absolute;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  opacity: 0;
`;
const Tooltip = ({ name }: tooltipType) => {
  return <Container>{name}</Container>;
};

export default Tooltip;
