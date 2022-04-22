import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import Chat from '../organisms/meeting/chat/Chat';
import FunctionButtons from '../organisms/meeting/FunctionButtons';
import { isOpenChat } from '../recoil/atom';

const MeetingContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  overflow-x: hidden;
`;

const MeetingInnerContainer = styled.div<{ isChatOpen: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${(props) =>
    props.isChatOpen ? '0 20px 24px 20px' : '0 40px 24px 40px'};
  box-sizing: border-box;
  width: ${(props) => (props.isChatOpen ? `calc(100% - 280px)` : '100%')};
`;

const VideoContainer = styled.div<{ isChatOpen: boolean }>`
  width: 100%;
  height: 100%;
  padding: ${(props) => (props.isChatOpen ? '30px 0' : '100px 0px')};
  display: grid;
  grid-template-columns: ${(props) =>
    props.isChatOpen ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'};
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Video = styled.div`
  width: 230px;
  height: 170px;
  background-color: black;
  border-radius: 10px;
`;

const Meeting = () => {
  const [isChatOpen, setIsChatOpen] = useRecoilState(isOpenChat);

  const onOpenChat = () => {
    setIsChatOpen(true);
  };

  console.log(isChatOpen);

  return (
    <MeetingContainer>
      <MeetingInnerContainer isChatOpen={isChatOpen}>
        <VideoContainer isChatOpen={isChatOpen}>
          <Video />
          <Video />
          <Video />
          <Video />
          <Video />
          <Video />
        </VideoContainer>
        <FunctionButtons />
        {!isChatOpen && <>{!isChatOpen && <button onClick={onOpenChat} />}</>}
      </MeetingInnerContainer>
      <Chat />
    </MeetingContainer>
  );
};

export default Meeting;
