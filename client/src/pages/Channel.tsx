import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import axios from 'axios';
import Editor from '../molecules/chat/Editor';
import Message from '../molecules/chat/Message';
import { useRecoilState } from 'recoil';
import { channelContents, channelMessage } from '../recoil/atom';
import { contentTypes } from '../types/channel/contentType';
import Messages from '../organisms/chat/Messages';

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 70px;
`;

const Channel = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useRecoilState<string>(channelMessage);
  const [contents, setContents] =
    useRecoilState<contentTypes[]>(channelContents);

  let sockJS = new SockJS('http://localhost:8080/chatting');
  let client = Stomp.over(sockJS);
  const token =
    'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0aGVAbmF2ZXIuY29tIiwiYXV0aCI6IlJPTEVfVVNFUiIsImlzcyI6IlRvb2xpdiIsImlhdCI6MTY1MDkzNzM3MiwiZXhwIjoxNjUxMDIzNzcyfQ.e4HGtKNs-qjsdXowigwbl1rGfZufb3efBw6DBpRp8q9ctC3UbgkVYRRpuvFxlsPUOe5Ri2avjHUpNFzJ1NEbfg';
  const channelId = 'b472907f-122f-4db7-9617-d0d5b5671e36';

  useEffect(() => {
    client.connect(
      {
        Authorization: `Bearer ${token}`,
      },
      (frame) => {
        console.log('STOMP Connection');
        axios
          .post(`http://localhost:8080/api/chat/room/${channelId}`, null, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            axios
              .get(
                `http://localhost:8080/api/chat/room/${channelId}`,

                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
              .then((res) => {
                console.log(res);
                console.log([...contents, res.data.chatMessageDTOList]);
                setContents(res.data.chatMessageDTOList);
              });
          });
      }
    );
  }, []);

  const sendMessage = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    client.send(
      '/pub/chat/message',
      {
        Authorization: `Bearer ${token}`,
      },
      JSON.stringify({
        roomId: 'b472907f-122f-4db7-9617-d0d5b5671e36',
        sender: '인주비',
        contents: message,
        type: 'TALK',
      })
    );
  };

  return (
    <Container>
      <Messages />
      <Editor onClick={sendMessage} />
    </Container>
  );
};

export default Channel;
