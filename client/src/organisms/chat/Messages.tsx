import styled from '@emotion/styled';
import React, { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import Message from '../../molecules/chat/Message';
import { channelContents } from '../../recoil/atom';
import { colors } from '../../shared/color';
import { contentTypes } from '../../types/channel/contentType';
const Container = styled.div`
  width: calc(100% + 38px);
  height: 100%;
  overflow-y: auto;
  padding-right: 32px;
  /* 스크롤바 설정*/
  &::-webkit-scrollbar {
    width: 6px;
  }

  /* 스크롤바 막대 설정*/
  &::-webkit-scrollbar-thumb {
    height: 17%;
    background-color: ${colors.gray300};
    /* 스크롤바 둥글게 설정    */
    border-radius: 10px;
  }

  /* 스크롤바 뒷 배경 설정*/
  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0);
  }
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
      {contents &&
        contents.map((content, index) => <Message key={index} {...content} />)}
    </Container>
  );
};

export default Messages;
