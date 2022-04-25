import styled from '@emotion/styled';
import React, { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import Message from '../../molecules/chat/Message';
import { channelContents } from '../../recoil/atom';
import { colors } from '../../shared/color';
import { contentTypes } from '../../types/channel/contentType';
const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

const Messages = () => {
  const contents = useRecoilValue<contentTypes[]>(channelContents);
  const messageBoxRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [contents]);

  return (
    <Container ref={messageBoxRef}>
      {contents.map((content, index) => (
        <Message key={index} {...content} />
      ))}
    </Container>
  );
};

export default Messages;
