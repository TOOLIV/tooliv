import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Stomp from 'stompjs';
import Editor from '../molecules/chat/Editor';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  channelContents,
  channelMessage,
  chatFileNames,
  chatFiles,
  chatFileUrl,
  stompClient,
} from '../recoil/atom';
import { contentTypes } from '../types/channel/contentType';
import Messages from '../organisms/chat/Messages';
import { enterChannel, subChannel } from 'api/chatApi';
import Files from 'organisms/chat/Files';
import { FileTypes } from 'types/common/fileTypes';
import { user } from 'recoil/auth';
import { marked } from 'marked';
import LoadSpinner from 'atoms/common/LoadSpinner';
import { send } from 'services/wsconnect';

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
  const [client, setClient] = useRecoilState<Stomp.Client>(stompClient);

  useEffect(() => {
    setIsLoading(true);
    // let sockJS = baseURL
    //   ? new SockJS(`${JSON.parse(baseURL).url}/chatting`)
    //   : // 로컬에서 테스트시 REACT_APP_BASE_URL, server 주소는 REACT_APP_BASE_SERVER_URL
    //     new SockJS(`${process.env.REACT_APP_BASE_URL}/chatting`);
    // let client: Stomp.Client = Stomp.over(sockJS);
    // client.connect(
    //   {
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    //   (frame) => {
    //     console.log('STOMP Connection');
    let sub: Stomp.Subscription;
    enterChannel(channelId!).then(() => {
      subChannel(channelId!).then((res) => {
        setContents(res.data.chatMessageDTOList);
        setIsLoading(false);
      });
    });
    //   }
    // );
    // client.subscribe(`/sub/chat/room/${channelId}`, (response) => {
    //   console.log(response);
    //   setContents((prev) => [...prev, JSON.parse(response.body)]);
    // });
    // return () =>
    //   client.disconnect(() => {
    //     console.log('disconnect');
    //     // setClient(Stomp.over(sockJS));
    //   });
    // return () => sub && sub.unsubscribe();
  }, [channelId, client]);

  const onSendClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    send({
      accessToken,
      channelId,
      nickname,
      email,
      message,
      fileUrl,
      fileNames,
    });
  };

  const sendMessage = () => {
    send({
      accessToken,
      channelId,
      nickname,
      email,
      message,
      fileUrl,
      fileNames,
    });

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
