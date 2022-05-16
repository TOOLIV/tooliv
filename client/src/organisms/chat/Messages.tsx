import styled from '@emotion/styled';
import { createDMRoom } from 'api/chatApi';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { user } from 'recoil/auth';
import { colors } from 'shared/color';
import { DMInfoType } from 'types/channel/chatTypes';
import { FileTypes } from 'types/common/fileTypes';
import { korDate } from 'utils/formatTime';
import Message from '../../molecules/chat/Message';
import {
  channelContents,
  chatFiles,
  DMList,
  dmName,
  searchIndex,
  searchResults,
} from '../../recoil/atom';
import {
  channelMemberType,
  contentTypes,
} from '../../types/channel/contentType';

const Container = styled.div<{ isFile: boolean }>`
  width: calc(100% + 38px);
  height: ${(props) => (props.isFile ? 'calc(100% - 70px)' : '100%')};
  padding-right: 32px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
const MessageContainer = styled.div`
  overflow-y: auto;
`;
const Date = styled.div`
  color: ${colors.gray400};
`;

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
      console.log(messageBoxRef.current.scrollHeight);
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
                  <>
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
                      key={content.chatId}
                      {...content}
                      isSearched={
                        Number(content.chatId) === searchList[searchedIndex]
                      }
                      // setProfileModal={handleDirectMessage}
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
