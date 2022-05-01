import styled from '@emotion/styled';
import ChannelHeader from 'organisms/header/ChannelHeader';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Nav from '../atoms/home/Nav';
import Chat from '../organisms/meeting/chat/Chat';
import { isOpenChat, isOpenSide } from '../recoil/atom';
import SideMenu from './SideMenu';

const Wrapper = styled.div<{ leftMargin: number; rightMargin: number }>`
  /* position: absolute; */
  width: calc(
    100vw - ${(props) => props.leftMargin + props.rightMargin + 'px'}
  );
  height: calc(100vh - 40px);
  margin-left: ${(props) => props.leftMargin + 'px'};
  margin-right: ${(props) => props.rightMargin + 'px'};
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  /* height: calc(100vh - 40px); */
  justify-content: space-between;
`;
const InnerContainer = styled.div<{ leftMargin: number; rightMargin: number }>`
  padding: 30px 40px;
  width: inherit;
  height: calc(100vh - 116px);
  background-color: ${(props) => props.theme.bgColor};
`;

const Home = () => {
  const isOpen = useRecoilValue<boolean>(isOpenSide);
  const isChatOpen = useRecoilValue<boolean>(isOpenChat);
  const leftMargin = isOpen ? 280 : 42;
  const rightMargin = isChatOpen ? 280 : 0;

  return (
    <>
      <Nav />
      <Container>
        <SideMenu />
        <Wrapper leftMargin={leftMargin} rightMargin={rightMargin}>
          <ChannelHeader />
          <InnerContainer leftMargin={leftMargin} rightMargin={rightMargin}>
            <Outlet />
          </InnerContainer>
        </Wrapper>
        <Chat />
      </Container>
    </>
  );
};

export default Home;
