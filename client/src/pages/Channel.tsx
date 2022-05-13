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
  chatMember,
  wsList,
} from '../recoil/atom';
import { channelNotiType, contentTypes } from '../types/channel/contentType';
import Messages from '../organisms/chat/Messages';
import { enterChannel, subChannel, updateLoggedTime } from 'api/chatApi';
import Files from 'organisms/chat/Files';
import { FileTypes } from 'types/common/fileTypes';
import { user } from 'recoil/auth';
import LoadSpinner from 'atoms/common/LoadSpinner';
import { send } from 'services/wsconnect';
import { workspaceListType } from 'types/workspace/workspaceTypes';

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
  const [chatMembers, setChatMembers] = useRecoilState<string[]>(chatMember);
  const [fileUrl, setFileUrl] = useRecoilState<string[]>(chatFileUrl);
  const [fileNames, setFileNames] = useRecoilState<string[]>(chatFileNames);
  const { email } = useRecoilValue(user);
  const [notiList, setNotiList] =
    useRecoilState<channelNotiType[]>(channelNotiList);
  const { workspaceId, channelId } = useParams<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [workspaceList, setWorkspaceList] =
    useRecoilState<workspaceListType[]>(wsList);

  useEffect(() => {
    let flag = false;
    const newList: channelNotiType[] = notiList.map((noti) => {
      if (
        noti.workspaceId === workspaceId &&
        noti.channelId !== channelId &&
        noti.notificationRead
      ) {
        flag = true;
      }
      if (noti.channelId === channelId) {
        return { ...noti, notificationRead: false };
      } else return noti;
    });

    if (!flag) {
      console.log('all channel read');
      setWorkspaceList(
        workspaceList.map((dto: any) => {
          if (workspaceId === dto.id) {
            return { ...dto, noti: false };
          } else return dto;
        })
      );
    }
    setNotiList(newList);
    setIsLoading(true);
    enterChannel(channelId!).then(() => {
      subChannel(channelId!).then((res) => {
        setContents(res.data.chatMessageDTOList);
        setIsLoading(false);

        let list: string[] = [];
        res.data.chatMessageDTOList?.forEach((data: contentTypes) => {
          list.push(data.email);
        });
        let result = Array.from(new Set(list));
        setChatMembers(result);
      });
    });
    // updateLoggedTime(channelId, 'CHANNEL');
  }, [channelId]);

  useEffect(() => {
    // console.log('----------' + notiList);
    window.addEventListener('beforeunload', (e: any) => {
      updateLoggedTime(channelId, 'CHANNEL');
    });
    // return () => update();
  }, [workspaceId, channelId]);

  // const update = () => {
  //   console.log('dm unmount update');
  //   updateLoggedTime(channelId, 'CHANNEL').then((res) => {
  //     console.log(res);
  //   });
  // };

  // useEffect(() => {
  //   console.log('hi');
  //   updateLoggedTime(channelId, 'CHANNEL').then((res) => {
  //     console.log(res);
  //   });
  // }, [workspaceId]);

  const onSendClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    sendMessage();
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
