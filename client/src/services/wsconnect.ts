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
  email: string,
  setContents: SetterOrUpdater<contentTypes[]>,
  notiList: channelNotiType[],
  setNotiList: SetterOrUpdater<channelNotiType[]>,
  list: any
) => {
  client.connect(
    {
      Authorization: `Bearer ${accessToken}`,
    },
    (frame) => {
      console.log('STOMP Connection');
      list.map((id: string) => {
        client.subscribe(`/sub/chat/room/${id}`, (response) => {
          const link = window.location.href.split('/');
          // 현재 채널 아이디
          const channelId = link[link.length - 1];
          const recChannelId = JSON.parse(response.body).channelId;
          if (channelId === recChannelId) {
            // 현재 채널 아이디와 도착한 메시지의 채널 아이디가 같으면
            setContents((prev) => [...prev, JSON.parse(response.body)]);
          } else {
            const newList: channelNotiType[] = notiList.map((noti) => {
              if (noti.id === recChannelId)
                return { id: noti.id, readYn: false };
              else return noti;
            });

            setNotiList(newList);
          }
        });
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
      originalFiles: fileNames ? fileNames : null,
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
