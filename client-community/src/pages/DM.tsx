import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
import { enterDM, subDM, updateLoggedTime } from 'api/chatApi';
import Files from 'organisms/chat/Files';
import { FileTypes } from 'types/common/fileTypes';
import { user } from 'recoil/auth';
import LoadSpinner from 'atoms/common/LoadSpinner';
import { sendDM } from 'services/wsconnect';

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
  const { accessToken, email } = useRecoilValue(user);
  const [notiList, setNotiList] =
    useRecoilState<channelNotiType[]>(channelNotiList);
  const { channelId } = useParams<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    window.addEventListener('beforeunload', (e: any) => {
      updateLoggedTime(channelId, 'DM');
    });
    return () => update();
  }, []);

  const update = () => {
    updateLoggedTime(channelId, 'DM');
  };

  useEffect(() => {
    const newList: channelNotiType[] = notiList.map((noti) => {
      if (noti.channelId === channelId) {
        return { ...noti, notificationRead: false };
      } else return noti;
    });
    setNotiList(newList);
    setIsLoading(true);
    enterDM(channelId!).then(() => {
      subDM(channelId!).then((res) => {
        setContents(res.data.directInfoDTOList);
        setIsLoading(false);
      });
    });
  }, [channelId]);

  const onSendClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (message !== '') sendMessage();
  };

  const sendMessage = () => {
    sendDM({
      accessToken,
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
