import styled from '@emotion/styled';
import ChannelHeader from 'organisms/header/ChannelHeader';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Nav from '../organisms/navbar/Nav';
import Chat from '../organisms/meeting/chat/Chat';
import { isBulr, isOpenChat, isOpenSide, isTutorial } from '../recoil/atom';
import SideMenu from './SideMenu';
import Tutorial from './Tutorial';
import { BulrContainer } from 'organisms/meeting/video/ScreenShareModal';

const Wrapper = styled.div<{ leftMargin: number; rightMargin: number }>`
  /* position: absolute; */
  width: calc(
    100vw - ${(props) => props.leftMargin + props.rightMargin + 'px'}
  );
  height: calc(100vh - 64px);
  margin-left: ${(props) => props.leftMargin + 'px'};
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${(props) => props.theme.bgColor};
`;

const InnerContainer = styled.div<{ leftMargin: number; rightMargin: number }>`
  padding: 30px 40px;
  width: inherit;
  height: calc(100vh - 140px);
  /* background-color: ${(props) => props.theme.bgColor}; */
`;

const Home = () => {
  const isOpen = useRecoilValue<boolean>(isOpenSide);
  const isChatOpen = useRecoilValue<boolean>(isOpenChat);
  const isTutorialOpen = useRecoilValue(isTutorial);
  const isBulrOpen = useRecoilValue(isBulr);

  const leftMargin = isOpen ? 280 : 42;
  const rightMargin = isChatOpen ? 280 : 0;

  return (
    <>
      <Nav />
      {isBulrOpen && <BulrContainer />}
      <Container>
        <SideMenu />
        <Wrapper leftMargin={leftMargin} rightMargin={rightMargin}>
          <ChannelHeader />
          <InnerContainer leftMargin={leftMargin} rightMargin={rightMargin}>
            <Outlet />
          </InnerContainer>
        </Wrapper>
        {isChatOpen && <Chat />}
        {isTutorialOpen && <Tutorial />}
      </Container>
    </>
  );
};

export default Home;
