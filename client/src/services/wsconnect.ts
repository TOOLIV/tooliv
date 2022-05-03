import { getChannels } from 'api/chatApi';
import { marked } from 'marked';
import { SetterOrUpdater } from 'recoil';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { contentTypes } from 'types/channel/contentType';
const baseURL = localStorage.getItem('baseURL');
let sockJS = baseURL
  ? new SockJS(`${JSON.parse(baseURL).url}/chatting`)
  : // 로컬에서 테스트시 REACT_APP_BASE_URL, server 주소는 REACT_APP_BASE_SERVER_URL
    new SockJS(`${process.env.REACT_APP_BASE_SERVER_URL}/chatting`);
let client: Stomp.Client = Stomp.over(sockJS);
export const connect = (
  accessToken: string,
  email: string,
  setContents: SetterOrUpdater<contentTypes[]>
) => {
  client.connect(
    {
      Authorization: `Bearer ${accessToken}`,
    },
    (frame) => {
      console.log('STOMP Connection');
      getChannels(email).then((res) => {
        console.log(res.data.notificationChannelList);
        res.data.notificationChannelList.map((id: string) => {
          client.subscribe(`/sub/chat/room/${id}`, (response) => {
            const channelId = window.location.href.split('/');
            if (
              channelId[channelId.length - 1] ===
              JSON.parse(response.body).channelId
            ) {
              console.log(id, JSON.parse(response.body).channelId);
              setContents((prev) => [...prev, JSON.parse(response.body)]);
            }
          });
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
