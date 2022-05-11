import { url } from 'inspector';
import { marked } from 'marked';
import { SetterOrUpdater } from 'recoil';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { SendDMProps, SendMessageProps } from 'types/channel/chatTypes';
import { channelNotiType, contentTypes } from 'types/channel/contentType';
import { workspaceListType } from 'types/workspace/workspaceTypes';
import { channelContents, channelNotiList, wsList } from 'recoil/atom';
import { getRecoil, setRecoil } from 'recoil-nexus';
import { user } from 'recoil/auth';
const baseURL = localStorage.getItem('baseURL');
let sockJS = baseURL
  ? new SockJS(`${JSON.parse(baseURL).url}/chatting`)
  : // 로컬에서 테스트시 REACT_APP_TEST_URL, server 주소는 REACT_APP_BASE_SERVER_URL
    new SockJS(`${process.env.REACT_APP_BASE_SERVER_URL}/chatting`);
export let client: Stomp.Client = Stomp.over(sockJS);
let subscribe: Stomp.Subscription;

const userInfo = getRecoil(user);
const contents = getRecoil(channelContents);

// console.log(client);
export const connect = (
  accessToken: string,
  setContents: SetterOrUpdater<contentTypes[]>,
  userId: string
) => {
  // console.log('connect start', accessToken);
  // client.connect(
  //   {
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  //   (frame) => {
  //     sub(setContents, userId);
  //   },
  //   (frame) => {
  //     console.log('connect error');
  //   }
  // );
};

export const deleteDM = (
  accessToken: string,
  channelId: string,
  chatId: string
) => {
  // client.send(
  //   '/pub/chat/directMessage',
  //   {
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  //   JSON.stringify({
  //     channelId: channelId,
  //     chatId: chatId,
  //     type: 'DELETE',
  //     deleted: true,
  //   })
  // );
};

export const deleteChat = (
  accessToken: string,
  channelId: string,
  chatId: string
) => {
  // client.send(
  //   '/pub/chat/message',
  //   {
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  //   JSON.stringify({
  //     channelId: channelId,
  //     chatId: chatId,
  //     type: 'DELETE',
  //     deleted: true,
  //   })
  // );
};

export const updateChat = ({
  channelId,
  chatId,
  email,
  message,
  fileUrl,
  fileNames,
}: SendMessageProps) => {
  // client.send(
  //   '/pub/chat/message',
  //   {
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  //   JSON.stringify({
  //     channelId: channelId,
  //     chatId: chatId,
  //     email: email,
  //     sendTime: new Date(),
  //     contents: getMarkdownText(message),
  //     type: 'UPDATE',
  //     files: fileUrl ? fileUrl : null,
  //     originFiles: fileNames ? fileNames : null,
  //     updated: true,
  //   })
  // );
};

export const updateDM = ({
  channelId,
  chatId,
  email,
  message,
  fileUrl,
  fileNames,
}: SendMessageProps) => {
  // client.send(
  //   '/pub/chat/directMessage',
  //   {
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  //   JSON.stringify({
  //     channelId: channelId,
  //     chatId: chatId,
  //     email: email,
  //     sendTime: new Date(),
  //     contents: getMarkdownText(message),
  //     type: 'UPDATE',
  //     files: fileUrl ? fileUrl : null,
  //     originFiles: fileNames ? fileNames : null,
  //     updated: true,
  //   })
  // );
};

export const send = ({
  channelId,
  email,
  message,
  fileUrl,
  fileNames,
}: SendMessageProps) => {
  client.send(
    '/pub/chat/message',
    {
      Authorization: `Bearer ${userInfo.accessToken}`,
    },
    JSON.stringify({
      channelId: channelId,
      email: email,
      sendTime: new Date(),
      contents: getMarkdownText(message),
      type: 'TALK',
      files: fileUrl ? fileUrl : null,
      originFiles: fileNames ? fileNames : null,
    })
  );
};

export const sendDM = ({
  accessToken,
  channelId,
  email,
  message,
  fileUrl,
  fileNames,
}: SendDMProps) => {
  // client.send(
  //   '/pub/chat/directMessage',
  //   {
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  //   JSON.stringify({
  //     channelId,
  //     email,
  //     sendTime: new Date(),
  //     contents: getMarkdownText(message),
  //     type: 'TALK',
  //     files: fileUrl ? fileUrl : null,
  //     originFiles: fileNames ? fileNames : null,
  //   })
  // );
};

export const getMarkdownText = (message: string) => {
  const rawMarkup = marked(message, {
    gfm: true,
    breaks: true,
    xhtml: true,
  });
  return rawMarkup;
};

// 채널 새로 생성했을 때 구독 추가하기
export const sub = () => {
  subscribe = client.subscribe(`/sub/chat/${userInfo.userId}`, (response) => {
    const notiList = getRecoil(channelNotiList);
    const workspaceList = getRecoil(wsList);
    const link = window.location.href.split('/');
    // 현재 채널, 워크스페이스 아이디
    const channelId = link[link.length - 1];
    const workspaceId = link[link.length - 2];
    const content = JSON.parse(response.body);
    const recChannelId = content.channelId;
    let updateWorkspaceId: string = '';
    const type = content.type;
    if (type === 'DELETE') {
      const index = content.chatId;
      setRecoil(channelContents, (prev) => [
        ...prev.slice(0, index),
        content,
        ...prev.slice(index + 1),
      ]);
    } else if (type === 'UPDATE') {
    } else {
      if (channelId === recChannelId) {
        // 현재 채널 아이디와 도착한 메시지의 채널 아이디가 같으면
        setRecoil(channelContents, (prev) => [...prev, content]);
      } else {
        // 현재 채널 아이디와 도착한 메시지의 채널 아이디가 다르면
        const newList: channelNotiType[] = notiList.map((noti) => {
          if (
            noti.workspaceId !== channelId &&
            noti.channelId === recChannelId
          ) {
            updateWorkspaceId = noti.workspaceId!;
            return { ...noti, notificationRead: false };
          } else {
            return noti;
          }
        });
        setRecoil(channelNotiList, newList);
        if (workspaceId !== updateWorkspaceId) {
          const newWSList: workspaceListType[] = workspaceList.map(
            (workspace) => {
              if (
                workspace.id !== workspaceId &&
                workspace.id === updateWorkspaceId
              ) {
                return { ...workspace, noti: false };
              } else {
                return workspace;
              }
            }
          );
          setRecoil(wsList, newWSList);
        }
      }
    }
  });
};

export const unsub = () => {
  // subscribe.unsubscribe();
};

client.connect(
  {
    Authorization: `Bearer ${userInfo.accessToken}`,
  },
  (frame) => {
    sub();
  },
  (frame) => {
    console.log('connect error');
  }
);
