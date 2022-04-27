import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import axios from 'axios';
import Editor from '../molecules/chat/Editor';
import Message from '../molecules/chat/Message';
import { useRecoilState, useRecoilValue } from 'recoil';
import { channelContents, channelMessage, chatFileUrl } from '../recoil/atom';
import { contentTypes } from '../types/channel/contentType';
import Messages from '../organisms/chat/Messages';
import { enterChannel, subChannel } from 'api/chatApi';
import { token } from 'recoil/auth';
import DragDrop from 'organisms/chat/DragDrop';

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 70px;
`;

const Channel = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useRecoilState<string>(channelMessage);
  const [contents, setContents] =
    useRecoilState<contentTypes[]>(channelContents);
  const fileUrl = useRecoilValue<string>(chatFileUrl);
  const { accessToken } = useRecoilValue(token);
  let sockJS = new SockJS('http://localhost:8080/chatting');
  let client = Stomp.over(sockJS);
  const channelId = 'b472907f-122f-4db7-9617-d0d5b5671e36';

  useEffect(() => {
    client.connect(
      {
        Authorization: `Bearer ${accessToken}`,
      },
      (frame) => {
        console.log('STOMP Connection');
        enterChannel(channelId).then((res) => {
          subChannel(channelId);
          client.subscribe(`/sub/chat/room/${channelId}`, (response) => {
            setContents((prev) => [...prev, JSON.parse(response.body)]);
          });
        });
      }
    );
  }, []);

  const sendMessage = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    client.send(
      '/pub/chat/message',
      {
        Authorization: `Bearer ${accessToken}`,
      },
      JSON.stringify({
        roomId: 'b472907f-122f-4db7-9617-d0d5b5671e36',
        sender: '인주비',
        contents: message,
        type: 'TALK',
        files: fileUrl ? fileUrl : null,
      })
    );
    setMessage('');
  };

  return (
    <Container>
      <Messages />
      <DragDrop />
      <Editor onClick={sendMessage} />
    </Container>
  );
};

export default Channel;
