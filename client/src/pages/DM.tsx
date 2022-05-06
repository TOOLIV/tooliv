import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Stomp from 'stompjs';
import Editor from '../molecules/chat/Editor';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  channelContents,
  channelMessage,
  channelNotiList,
  chatFileNames,
  chatFiles,
  chatFileUrl,
} from '../recoil/atom';
import { channelNotiType, contentTypes } from '../types/channel/contentType';
import Messages from '../organisms/chat/Messages';
import { enterChannel, enterDM, subChannel, subDM } from 'api/chatApi';
import Files from 'organisms/chat/Files';
import { FileTypes } from 'types/common/fileTypes';
import { user } from 'recoil/auth';
import LoadSpinner from 'atoms/common/LoadSpinner';
import { send, sendDM } from 'services/wsconnect';

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

const DM = () => {
  const [message, setMessage] = useRecoilState<string>(channelMessage);
  const [files, setFiles] = useRecoilState<FileTypes[]>(chatFiles);
  const [contents, setContents] =
    useRecoilState<contentTypes[]>(channelContents);
  const [fileUrl, setFileUrl] = useRecoilState<string[]>(chatFileUrl);
  const [fileNames, setFileNames] = useRecoilState<string[]>(chatFileNames);
  const { accessToken, nickname, email } = useRecoilValue(user);
  const [notiList, setNotiList] =
    useRecoilState<channelNotiType[]>(channelNotiList);
  // const { channelId } = useParams<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const channelId = 'ffdfd08b-2969-4037-b313-e5a88d94dd95';
  useEffect(() => {
    // const newList: channelNotiType[] = notiList.map((noti) => {
    //   if (noti.channelId === channelId)
    //     return { ...noti, notificationRead: true };
    //   else return noti;
    // });
    // console.log(newList);
    // setNotiList(newList);
    setIsLoading(true);
    enterDM(channelId!).then(() => {
      subDM(channelId!).then((res) => {
        console.log(res.data);
        setContents(res.data.directInfoDTOList);
        setIsLoading(false);
      });
    });
  }, [channelId]);

  const onSendClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    sendDM({
      accessToken,
      channelId,
      nickname,
      senderEmail: email,
      receiverEmail: 'the@naver.com',
      message,
      fileUrl,
      fileNames,
    });

    setMessage('');
    setFiles([]);
    setFileUrl([]);
  };

  const sendMessage = () => {
    sendDM({
      accessToken,
      channelId,
      nickname,
      senderEmail: email,
      receiverEmail: 'the@naver.com',
      message,
      fileUrl,
      fileNames,
    });

    setMessage('');
    setFiles([]);
    setFileUrl([]);
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
        <Editor type="DM" onClick={onSendClick} sendMessage={sendMessage} />
      </Container>
    </>
  );
};

export default DM;
