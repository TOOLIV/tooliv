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
  chatMember,
  isOpenChat,
} from '../../../recoil/atom';
import { enterChannel, subChannel } from 'api/chatApi';
import { contentTypes } from 'types/channel/contentType';
import { useParams } from 'react-router-dom';
import Editor from 'molecules/chat/Editor';
import { send } from 'services/wsconnect';
import { user } from 'recoil/auth';

const ChatContainer = styled.div`
  width: 280px;
  background-color: ${(props) => props.theme.sideBgColor};
  border-radius: 40px 0 0 0;
  height: calc(100vh - 64px);
`;

const Header = styled.div`
  padding: 0 18px;
`;

const ContentContainer = styled.div`
  overflow-y: auto;
  height: calc(100vh - 178px);
`;
const Chat = () => {
  const [isChatOpen, setIsChatOpen] = useRecoilState<boolean>(isOpenChat);
  const [message, setMessage] = useRecoilState<string>(channelMessage);
  const [chatMembers, setChatMembers] = useRecoilState<string[]>(chatMember);
  const [contents, setContents] =
    useRecoilState<contentTypes[]>(channelContents);
  const { channelId } = useParams<string>();
  const messageBoxRef = useRef<HTMLDivElement>(null);
  const { accessToken, email } = useRecoilValue(user);

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

        // res.data.chatMessageDTOList.forEach((data: contentTypes) => {
        //   setChatMembers([...chatMembers, data.email]);
        // });
      });
    });
  }, []);

  useEffect(() => {
    console.log(chatMembers);
  }, [chatMembers]);

  const onSendClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    sendMessage();
  };

  const sendMessage = () => {
    send({
      accessToken,
      channelId,
      email,
      message,
    });

    setMessage('');
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
        <ContentContainer ref={messageBoxRef}>
          {contents &&
            contents.map((content, idx) => <ChatItem {...content} />)}
        </ContentContainer>
        <Editor onClick={onSendClick} sendMessage={sendMessage} />
      </>
    </ChatContainer>
  );
};

export default Chat;
