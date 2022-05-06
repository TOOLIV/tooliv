import styled from '@emotion/styled';
import React from 'react';
import { colors } from 'shared/color';

const Container = styled.div`
  display: flex;
  width: 200px;
  justify-content: space-around;
  border: 1px solid ${colors.gray200};
  border-radius: 10px;
  padding: 12px;
  margin-right: 12px;
  transition: 0.3s;
  font-size: 14px;
  &:hover {
    cursor: pointer;
    background-color: ${colors.gray100};
  }
`;

type fileType = {
  name: string;
  url: string;
};
const File = ({ name, url }: fileType) => {
  console.log(name);
  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    // e.preventDefault();
    window.open(url);
  };
  return <Container onClick={onClick}>{name}</Container>;
};
export default File;
