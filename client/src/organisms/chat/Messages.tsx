import styled from '@emotion/styled';
import React, { useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { FileTypes } from 'types/common/fileTypes';
import Message from '../../molecules/chat/Message';
import { channelContents, chatFiles } from '../../recoil/atom';
import { colors } from '../../shared/color';
import { contentTypes } from '../../types/channel/contentType';
const Container = styled.div<{ isFile: boolean }>`
  width: calc(100% + 38px);
  height: ${(props) => (props.isFile ? 'calc(100% - 70px)' : '100%')};
  overflow-y: auto;
  padding-right: 32px;
`;

const Messages = () => {
  const contents = useRecoilValue<contentTypes[]>(channelContents);
  const [files, setFiles] = useRecoilState<FileTypes[]>(chatFiles);
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
    <Container isFile={files.length > 0 ? true : false} ref={messageBoxRef}>
      {contents &&
        contents.map((content) => (
          <Message key={content.chatId} {...content} />
        ))}
    </Container>
  );
};

export default Messages;
