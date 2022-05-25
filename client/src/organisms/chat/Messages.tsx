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
  width: 100%;
  height: ${(props) =>
    props.isFile ? 'calc(100% - 130px)' : 'calc(100% - 72px)'};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
const MessageContainer = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Date = styled.div`
  color: ${colors.gray400};
`;

const MessageWrapper = styled.div``;
const Messages = () => {
  const contents = useRecoilValue<contentTypes[]>(channelContents);
  const [files, setFiles] = useRecoilState<FileTypes[]>(chatFiles);
  const [searchList, setSearchList] = useRecoilState<number[]>(searchResults);
  const [searchedIndex, setSearchedIndex] = useRecoilState<number>(searchIndex);
  const [isProfileModal, setIsProfileModal] = useState<boolean>(false);
  const messageBoxRef = useRef<HTMLDivElement>(null);
  const searchedMsgRef = useRef<HTMLDivElement>(null);
  let date = korDate().toISOString().slice(0, 10);

  const scrollToBottom = () => {
    if (messageBoxRef.current) {
      // messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
      messageBoxRef.current.scrollTo({
        top: messageBoxRef.current.scrollHeight,
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [contents]);

  useEffect(() => {
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
    <Container isFile={files.length > 0 ? true : false}>
      <MessageContainer ref={messageBoxRef}>
        {contents &&
          contents.map((content) => {
            if (
              content.contents === '' &&
              content.files &&
              content.files.length === 0
            ) {
              return;
            } else {
              if (content.sendTime && content.sendTime.slice(0, 10) !== date) {
                date = content.sendTime.slice(0, 10);
                return (
                  <MessageWrapper key={content.chatId}>
                    <Date>
                      {date.slice(0, 4)}년 {date.slice(5, 7)}월{' '}
                      {date.slice(8, 10)}일
                    </Date>
                    <Message
                      ref={
                        Number(content.chatId) === searchList[searchedIndex]
                          ? searchedMsgRef
                          : null
                      }
                      // key={content.chatId}
                      {...content}
                      isSearched={
                        Number(content.chatId) === searchList[searchedIndex]
                      }
                      // setProfileModal={handleDirectMessage}
                    />
                  </MessageWrapper>
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
                    setProfileModal={setIsProfileModal}
                  />
                );
              }
            }
          })}
        {/* {isProfileModal && <UserProfileModal />} */}
      </MessageContainer>
    </Container>
  );
};

export default Messages;
