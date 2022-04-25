import styled from '@emotion/styled';
import React from 'react';
import { colors } from '../../shared/color';

const Container = styled.div`
  height: 76px;
  padding: 16px 40px;
  border-bottom: 1px solid ${colors.gray100};
`;

const Header = () => {
  return <Container>회원관리</Container>;
};

export default Header;
