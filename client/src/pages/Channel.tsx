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
  chatFileNames,
  chatFiles,
  chatFileUrl,
  isDragging,
} from '../recoil/atom';
import { contentTypes } from '../types/channel/contentType';
import Messages from '../organisms/chat/Messages';
import { enterChannel, subChannel } from 'api/chatApi';
import Files from 'organisms/chat/Files';
import { FileTypes } from 'types/common/fileTypes';
import { user } from 'recoil/auth';
import { marked } from 'marked';
import LoadSpinner from 'atoms/common/LoadSpinner';

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 70px;
`;

const LoadContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Channel = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useRecoilState<string>(channelMessage);
  const [files, setFiles] = useRecoilState<FileTypes[]>(chatFiles);
  const [contents, setContents] =
    useRecoilState<contentTypes[]>(channelContents);
  const [fileUrl, setFileUrl] = useRecoilState<string[]>(chatFileUrl);
  const [fileNames, setFileNames] = useRecoilState<string[]>(chatFileNames);
  const { accessToken, nickname, email } = useRecoilValue(user);
  const { channelId } = useParams<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const baseURL = localStorage.getItem('baseURL');
  let sockJS = baseURL
    ? new SockJS(`${JSON.parse(baseURL).url}/chatting`)
    : // 로컬에서 테스트시 REACT_APP_BASE_URL, server 주소는 REACT_APP_BASE_SERVER_URL
      new SockJS(`${process.env.REACT_APP_BASE_URL}/chatting`);
  let client = Stomp.over(sockJS);

  useEffect(() => {
    setIsLoading(true);
    client.connect(
      {
        Authorization: `Bearer ${accessToken}`,
      },
      (frame) => {
        console.log('STOMP Connection');
        enterChannel(channelId!).then(() => {
          subChannel(channelId!).then((res) => {
            setContents(res.data.chatMessageDTOList);
            setIsLoading(false);
            client.subscribe(`/sub/chat/room/${channelId}`, (response) => {
              console.log(response);
              setContents((prev) => [...prev, JSON.parse(response.body)]);
            });
          });
        });
      }
    );
    return () =>
      client.disconnect(() => {
        console.log('disconnect');
      });
  }, [channelId]);

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
        sender: nickname,
        email: email,
        sendTime: new Date(),
        contents: getMarkdownText(),
        type: 'TALK',
        files: fileUrl ? fileUrl : null,
        originalFiles: fileNames ? fileNames : null,
      })
    );
    setMessage('');
    setFiles([]);
    setFileUrl([]);
  };

  const getMarkdownText = () => {
    const rawMarkup = marked(message, {
      gfm: true,
      breaks: true,
      xhtml: true,
      // sanitize: true,
    });
    return rawMarkup;
  };

  return (
    <>
      <Container>
        {isLoading ? (
          <LoadContainer>
            <LoadSpinner />
          </LoadContainer>
        ) : (
          <Messages />
        )}
        <Files />
        <Editor onClick={onSendClick} sendMessage={sendMessage} />
      </Container>
    </>
  );
};

export default Channel;
