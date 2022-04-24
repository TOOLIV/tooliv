import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { Variants } from 'framer-motion/types/types';
import React from 'react';
import { useRecoilState } from 'recoil';
import Icons from '../../../atoms/common/Icons';
import ChatItem from '../../../molecules/meeting/ChatItem';
import MenuTemplate from '../../../atoms/sidemenu/MenuTemplate';
import { TopContainer } from '../../../molecules/sidemenu/Channels';
import { isOpenChat } from '../../../recoil/atom';
import { chatTypes } from '../../../types/meeting/chatTypes';

const ChatContainer = styled.div`
  margin-top: 24px;
  width: 280px;
  background-color: ${(props) => props.theme.sideBgColor};
  border-radius: 40px 0 0 0;
`;

const Chat = () => {
  const [isChatOpen, setIsChatOpen] = useRecoilState<boolean>(isOpenChat);

  const variants: Variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 1, x: 'calc(100vw - 280px)' },
  };

  const testSet: chatTypes[] = [
    {
      name: 'username1',
      timestamp: '오후 4:08',
      content: '안녕하세요',
    },
    {
      name: 'username2',
      timestamp: '오후 4:09',
      content: '안녕하세요',
    },
    {
      name: 'username3',
      timestamp: '오후 4:10',
      content: '안녕하세요',
    },
  ];

  const onCloseChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <AnimatePresence>
      {isChatOpen && (
        <ChatContainer>
          <>
            <TopContainer>
              <Icons icon="anglesRight" onClick={onCloseChat} />
              <MenuTemplate title="채팅" />
            </TopContainer>
            {testSet && testSet.map((data, idx) => <ChatItem data={data} />)}
          </>
        </ChatContainer>
      )}
    </AnimatePresence>
  );
};

export default Chat;
