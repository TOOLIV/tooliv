import styled from '@emotion/styled';
import React, { useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import Icons from '../../../atoms/common/Icons';
import ChatItem from '../../../molecules/meeting/ChatItem';
import MenuTemplate from '../../../atoms/sidemenu/MenuTemplate';
import { TopContainer } from '../../../molecules/sidemenu/Channels';
import {
  channelContents,
  channelMessage,
  chatFileNames,
  chatFiles,
  chatFileUrl,
  chatMember,
  isOpenChat,
} from '../../../recoil/atom';
import { enterChannel, subChannel } from 'api/chatApi';
import { contentTypes } from 'types/channel/contentType';
import { useParams } from 'react-router-dom';
import Editor from 'molecules/chat/Editor';
import { send } from 'services/wsconnect';
import { user } from 'recoil/auth';
import { FileTypes } from 'types/common/fileTypes';
import Files from 'organisms/chat/Files';

const ChatContainer = styled.div`
  width: 280px;
  background-color: ${(props) => props.theme.sideBgColor};
  border-radius: 40px 0 0 0;
  height: calc(100vh - 64px);
`;

const Header = styled.div`
  padding: 0 18px;
`;

const ContentContainer = styled.div<{ isFile: boolean }>`
  overflow-y: auto;
  height: ${(props) =>
    props.isFile ? 'calc(100vh - 248px)' : 'calc(100vh - 178px)'};
`;

const FilesContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Chat = () => {
  const [isChatOpen, setIsChatOpen] = useRecoilState<boolean>(isOpenChat);
  const [message, setMessage] = useRecoilState<string>(channelMessage);
  const [chatMembers, setChatMembers] = useRecoilState<string[]>(chatMember);
  const [files, setFiles] = useRecoilState<FileTypes[]>(chatFiles);
  const [fileUrl, setFileUrl] = useRecoilState<string[]>(chatFileUrl);
  const [fileNames, setFileNames] = useRecoilState<string[]>(chatFileNames);
  const [contents, setContents] =
    useRecoilState<contentTypes[]>(channelContents);
  const { channelId } = useParams<string>();
  const messageBoxRef = useRef<HTMLDivElement>(null);
  const { email } = useRecoilValue(user);

  const scrollToBottom = () => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [contents]);

  const onCloseChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  useEffect(() => {
    enterChannel(channelId!).then(() => {
      subChannel(channelId!).then((res) => {
        setContents(res.data.chatMessageDTOList);
      });
    });
  }, []);

  const onSendClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (message !== '') sendMessage();
    else if (files.length > 0) sendMessage();
  };

  const sendMessage = () => {
    send({
      channelId,
      email,
      message,
      fileUrl,
      fileNames,
    });

    setMessage('');
    setFiles([]);
    setFileUrl([]);
  };

  return (
    <ChatContainer>
      <>
        <Header>
          <TopContainer>
            <Icons icon="anglesRight" onClick={onCloseChat} />
            <MenuTemplate title="채팅" />
          </TopContainer>
        </Header>
        <ContentContainer
          isFile={files.length > 0 ? true : false}
          ref={messageBoxRef}
        >
          {contents &&
            contents.map((content, idx) => {
              if (
                content.contents === '' &&
                content.files &&
                content.files.length === 0
              ) {
                return;
              } else {
                return <ChatItem {...content} />;
              }
            })}
        </ContentContainer>
        <FilesContainer>
          <Files />
        </FilesContainer>
        <Editor onClick={onSendClick} sendMessage={sendMessage} />
      </>
    </ChatContainer>
  );
};

export default Chat;
