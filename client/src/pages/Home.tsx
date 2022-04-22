import styled from '@emotion/styled';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Header from '../atoms/home/Header';
import Nav from '../atoms/home/Nav';
import SideMenu from '../organisms/sidemenu/SideMenu';
import { isOpenSide } from '../recoil/atom';

const Wrapper = styled.div<{ sideMargin: string }>`
  position: absolute;
  width: calc(100vw - ${(props) => props.sideMargin});
  margin-top: 30px;
  margin-left: ${(props) => props.sideMargin};
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100vh - 40px);
`;
const InnerContainer = styled.div`
  padding: 30px 40px;
`;

const Home = () => {
  const isOpen = useRecoilValue<boolean>(isOpenSide);
  const sideMargin = isOpen ? '280px' : '42px';

  return (
    <>
      <Nav />
      <Container>
        <SideMenu />
        <Wrapper sideMargin={sideMargin}>
          <Header />
          <InnerContainer>
            <Outlet />
          </InnerContainer>
        </Wrapper>
      </Container>
    </>
  );
};

export default Home;
