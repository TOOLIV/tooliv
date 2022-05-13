import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { colors } from 'shared/color';
import { FileTypes } from 'types/common/fileTypes';
import { korDate } from 'utils/formatTime';
import Message from '../../molecules/chat/Message';
import {
  channelContents,
  chatFiles,
  searchIndex,
  searchResults,
} from '../../recoil/atom';
import { contentTypes } from '../../types/channel/contentType';

const Container = styled.div<{ isFile: boolean }>`
  width: calc(100% + 38px);
  height: ${(props) => (props.isFile ? 'calc(100% - 70px)' : '100%')};
  overflow-y: auto;
  padding-right: 32px;
`;

const Date = styled.div`
  color: ${colors.gray400};
`;

const Messages = () => {
  const contents = useRecoilValue<contentTypes[]>(channelContents);
  const [files, setFiles] = useRecoilState<FileTypes[]>(chatFiles);
  const [searchList, setSearchList] = useRecoilState<number[]>(searchResults);
  const [searchedIndex, setSearchedIndex] = useRecoilState<number>(searchIndex);
  const messageBoxRef = useRef<HTMLDivElement>(null);
  const searchedMsgRef = useRef<HTMLDivElement>(null);
  let date = korDate().toISOString().slice(0, 10);

  const scrollToBottom = () => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [contents]);

  useEffect(() => {
    console.log(searchedMsgRef.current?.scrollHeight);
    const searchedChatId: number = searchList[searchedIndex];
    if (
      messageBoxRef.current &&
      searchedIndex !== -1 &&
      searchedMsgRef.current
    ) {
      messageBoxRef.current.scrollTo({
        top:
          searchedMsgRef.current.offsetTop -
          searchedMsgRef.current?.scrollHeight -
          150,
      });
    }
  }, [searchedIndex]);

  return (
    <Container isFile={files.length > 0 ? true : false} ref={messageBoxRef}>
      {contents &&
        contents.map((content) => {
          if (content.sendTime && content.sendTime.slice(0, 10) !== date) {
            date = content.sendTime.slice(0, 10);
            return (
              <>
                <Date>
                  {date.slice(0, 4)}년 {date.slice(5, 7)}월 {date.slice(8, 10)}
                  일
                </Date>
                <Message
                  ref={
                    Number(content.chatId) === searchList[searchedIndex]
                      ? searchedMsgRef
                      : null
                  }
                  key={content.chatId}
                  {...content}
                  isSearched={
                    Number(content.chatId) === searchList[searchedIndex]
                  }
                />
              </>
            );
          } else {
            return (
              <Message
                ref={
                  Number(content.chatId) === searchList[searchedIndex]
                    ? searchedMsgRef
                    : null
                }
                key={content.chatId}
                {...content}
                isSearched={
                  Number(content.chatId) === searchList[searchedIndex]
                }
              />
            );
          }
        })}
    </Container>
  );
};

export default Messages;
