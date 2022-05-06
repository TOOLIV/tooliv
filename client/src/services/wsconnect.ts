import { getChannels } from 'api/chatApi';
import { marked } from 'marked';
import { SetterOrUpdater } from 'recoil';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { channelNotiType, contentTypes } from 'types/channel/contentType';
const baseURL = localStorage.getItem('baseURL');
let sockJS = baseURL
  ? new SockJS(`${JSON.parse(baseURL).url}/chatting`)
  : // 로컬에서 테스트시 REACT_APP_TEST_URL, server 주소는 REACT_APP_BASE_SERVER_URL
    new SockJS(`${process.env.REACT_APP_TEST_URL}/chatting`);
let client: Stomp.Client = Stomp.over(sockJS);
export const connect = (
  accessToken: string,
  setContents: SetterOrUpdater<contentTypes[]>,
  notiList: channelNotiType[],
  setNotiList: SetterOrUpdater<channelNotiType[]>,
  userId: string
) => {
  client.connect(
    {
      Authorization: `Bearer ${accessToken}`,
    },
    (frame) => {
      console.log('STOMP Connection');
      notiList.map((channel: channelNotiType) => {
        client.subscribe(`/sub/chat/room/${channel.channelId}`, (response) => {
          const link = window.location.href.split('/');
          // 현재 채널, 워크스페이스 아이디
          const channelId = link[link.length - 1];
          const workspaceId = link[link.length - 2];
          const recChannelId = JSON.parse(response.body).channelId;
          if (channelId === recChannelId) {
            // 현재 채널 아이디와 도착한 메시지의 채널 아이디가 같으면
            setContents((prev) => [...prev, JSON.parse(response.body)]);
          } else {
            const newList: channelNotiType[] = notiList.map((noti) => {
              if (noti.channelId === recChannelId) {
                return { ...noti, notificationRead: false };
              } else {
                return noti;
              }
            });
            setNotiList(newList);
          }
        });
      });
      client.subscribe(`/sub/chat/${userId}`, (response) => {
        console.log(response);
        setContents((prev) => [...prev, JSON.parse(response.body)]);
      });
    }
  );
};

type SendProps = {
  accessToken: string;
  channelId?: string;
  nickname: string;
  email: string;
  message: string;
  fileUrl: string[];
  fileNames: string[];
};

export const send = ({
  accessToken,
  channelId,
  nickname,
  email,
  message,
  fileUrl,
  fileNames,
}: SendProps) => {
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
      contents: getMarkdownText(message),
      type: 'TALK',
      files: fileUrl ? fileUrl : null,
      originFiles: fileNames ? fileNames : null,
    })
  );
};
type SendDMProps = {
  accessToken: string;
  channelId?: string;
  nickname: string;
  senderEmail: string;
  receiverEmail: string;
  message: string;
  fileUrl: string[];
  fileNames: string[];
};

export const sendDM = ({
  accessToken,
  channelId,
  nickname,
  senderEmail,
  receiverEmail,
  message,
  fileUrl,
  fileNames,
}: SendDMProps) => {
  client.send(
    '/pub/chat/directMessage',
    {
      Authorization: `Bearer ${accessToken}`,
    },
    JSON.stringify({
      channelId: channelId,
      sender: nickname,
      senderEmail: senderEmail,
      receiverEmail: receiverEmail,
      sendTime: new Date(),
      contents: getMarkdownText(message),
      type: 'TALK',
      files: fileUrl ? fileUrl : null,
      originFiles: fileNames ? fileNames : null,
    })
  );
};

const getMarkdownText = (message: string) => {
  const rawMarkup = marked(message, {
    gfm: true,
    breaks: true,
    xhtml: true,
  });
  return rawMarkup;
};

// 채널 새로 생성했을 때 구독 추가하기
export const sub = (
  id: string,
  setContents: SetterOrUpdater<contentTypes[]>
) => {
  client.subscribe(`/sub/chat/room/${id}`, (response) => {
    setContents((prev) => [...prev, JSON.parse(response.body)]);
  });
};
