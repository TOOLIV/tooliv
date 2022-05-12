import styled from '@emotion/styled';
import React, { useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { FileTypes } from 'types/common/fileTypes';
import Message from '../../molecules/chat/Message';
import {
  channelContents,
  chatFiles,
  searchIndex,
  searchResults,
} from '../../recoil/atom';
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
  const [searchList, setSearchList] = useRecoilState<number[]>(searchResults);
  const [searchedIndex, setSearchedIndex] = useRecoilState<number>(searchIndex);
  const messageBoxRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [contents]);

  useEffect(() => {
    const searchedChatId: number = searchList[searchedIndex];
    if (messageBoxRef.current && searchedIndex !== -1) {
      messageBoxRef.current.scrollTop =
        messageBoxRef.current.scrollHeight -
        160 * (contents.length - searchedChatId);
      console.log(messageBoxRef.current.scrollTop);
    }
  }, [searchedIndex]);

  return (
    <Container isFile={files.length > 0 ? true : false} ref={messageBoxRef}>
      {contents &&
        contents.map((content) => (
          <Message
            key={content.chatId}
            {...content}
            isSearched={Number(content.chatId) === searchList[searchedIndex]}
          />
        ))}
    </Container>
  );
};

export default Messages;
