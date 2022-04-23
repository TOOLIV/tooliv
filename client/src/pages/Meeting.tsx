import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import ChatButton from '../molecules/meeting/ChatButton';
import Chat from '../organisms/meeting/chat/Chat';
import FunctionButtons from '../organisms/meeting/FunctionButtons';
import Videos from '../organisms/meeting/video/Videos';
import { isOpenChat } from '../recoil/atom';

const MeetingContainer = styled.div`
  background-color: #787878;
`;

const MeetingInnerContainer = styled.div``;

const Meeting = () => {
  const [isChatOpen, setIsChatOpen] = useRecoilState(isOpenChat);

  const onOpenChat = () => {
    setIsChatOpen(true);
  };

  console.log(isChatOpen);

  return (
    <MeetingContainer>
      <MeetingInnerContainer>
        <Videos />
        <FunctionButtons />
        {!isChatOpen && (
          <>{!isChatOpen && <ChatButton onClick={onOpenChat} />}</>
        )}
      </MeetingInnerContainer>
    </MeetingContainer>
  );
};

export default Meeting;
