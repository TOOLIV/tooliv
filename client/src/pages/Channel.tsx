import styled from '@emotion/styled';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import axios from 'axios';
import Editor from '../molecules/chat/Editor';
import Message from '../molecules/chat/Message';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  channelContents,
  channelMessage,
  chatFiles,
  chatFileUrl,
  isDragging,
} from '../recoil/atom';
import { contentTypes } from '../types/channel/contentType';
import Messages from '../organisms/chat/Messages';
import { enterChannel, subChannel } from 'api/chatApi';
import { token } from 'recoil/auth';
import DragDrop from 'organisms/chat/DragDrop';
import Files from 'organisms/chat/Files';
import { FileTypes } from 'types/common/fileTypes';
import { marked } from 'marked';

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 70px;
`;

const Channel = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useRecoilState<string>(channelMessage);
  const [files, setFiles] = useRecoilState<FileTypes[]>(chatFiles);
  const [contents, setContents] =
    useRecoilState<contentTypes[]>(channelContents);
  const [fileUrl, setFileUrl] = useRecoilState<string[]>(chatFileUrl);
  const { accessToken } = useRecoilValue(token);
  const baseURL = localStorage.getItem('baseURL');
  let sockJS = baseURL
    ? new SockJS(`${JSON.parse(baseURL).url}/chatting`)
    : // 로컬에서 테스트시 REACT_APP_BASE_URL, server 주소는 REACT_APP_BASE_SERVER_URL
      new SockJS(`${process.env.REACT_APP_BASE_SERVER_URL}/chatting`);
  let client = Stomp.over(sockJS);
  const { channelId } = useParams<string>();

  useEffect(() => {
    client.connect(
      {
        Authorization: `Bearer ${accessToken}`,
      },
      (frame) => {
        console.log('STOMP Connection');
        enterChannel(channelId).then((res) => {
          console.log(res);
          subChannel(channelId);
          client.subscribe(`/sub/chat/room/${channelId}`, (response) => {
            console.log(response);
            setContents((prev) => [...prev, JSON.parse(response.body)]);
          });
        });
      }
    );
  }, []);

  const onSendClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    sendMessage();
  };

  const sendMessage = () => {
    client.send(
      '/pub/chat/message',
      {
        Authorization: `Bearer ${accessToken}`,
      },
      JSON.stringify({
        channelId: channelId,
        sender: '인주비',
        contents: getMarkdownText(),
        type: 'TALK',
        files: fileUrl ? fileUrl : null,
      })
    );
    setMessage('');
    setFiles([]);
    setFileUrl([]);
  };

  const getMarkdownText = () => {
    const rawMarkup = marked(
      message,
      // .replace(/\n/g, '<br />')
      {
        gfm: true,
        breaks: true,
        xhtml: true,
        // sanitize: true,
      }
    );
    return rawMarkup;
  };

  return (
    <>
      <Container>
        <Messages />
        <Files />
        <Editor onClick={onSendClick} sendMessage={sendMessage} />
      </Container>
    </>
  );
};

export default Channel;
