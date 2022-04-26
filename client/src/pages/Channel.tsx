import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import axios from 'axios';
import Editor from '../molecules/chat/Editor';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
const MessageContainer = styled.div`
  width: 100%;
  height: 80%;
`;
const Channel = () => {
  // const navigate = useNavigate();
  // let sockJS = new SockJS("http://localhost:8080/chatting");
  // let client = Stomp.over(sockJS);
  // useEffect(() => {
  //   client.connect(
  //     {
  //       Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0aGVAbmF2ZXIuY29tIiwiYXV0aCI6IlJPTEVfVVNFUiIsImlzcyI6IlRvb2xpdiIsImlhdCI6MTY1MDYxMDA2NywiZXhwIjoxNjUwNjk2NDY3fQ.vVdJSKhw9vSKKUZI51VvlhgAIuS2WKD7PgNb7jLx8aUDeW1YC8vf2U3q5_ptwmLtV9Ib1M1Q4OsVg3sPI8ujtw`,
  //     },
  //     (frame) => {
  //       console.log("STOMP Connection");
  //       //   client.subscribe(`/topic/one/${memberId}`, (response) => {
  //       //     console.log("sub")
  //       //   });

  //       axios
  //         .post(
  //           `http://localhost:8080/api/chat/room/b472907f-122f-4db7-9617-d0d5b5671e36`,
  //           null,
  //           {
  //             headers: {
  //               Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0aGVAbmF2ZXIuY29tIiwiYXV0aCI6IlJPTEVfVVNFUiIsImlzcyI6IlRvb2xpdiIsImlhdCI6MTY1MDYxMDA2NywiZXhwIjoxNjUwNjk2NDY3fQ.vVdJSKhw9vSKKUZI51VvlhgAIuS2WKD7PgNb7jLx8aUDeW1YC8vf2U3q5_ptwmLtV9Ib1M1Q4OsVg3sPI8ujtw`,
  //             },
  //           }
  //         )
  //         .then((res) => {
  //           console.log(res);
  //         });
  //       axios
  //         .get(
  //           `http://localhost:8080/api/chat/room/b472907f-122f-4db7-9617-d0d5b5671e36`,

  //           {
  //             headers: {
  //               Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0aGVAbmF2ZXIuY29tIiwiYXV0aCI6IlJPTEVfVVNFUiIsImlzcyI6IlRvb2xpdiIsImlhdCI6MTY1MDYxMDA2NywiZXhwIjoxNjUwNjk2NDY3fQ.vVdJSKhw9vSKKUZI51VvlhgAIuS2WKD7PgNb7jLx8aUDeW1YC8vf2U3q5_ptwmLtV9Ib1M1Q4OsVg3sPI8ujtw`,
  //             },
  //           }
  //         )
  //         .then((res) => {
  //           console.log(res);
  //         });
  //     }
  //   );
  // }, []);

  // const sendMessage = (event: React.MouseEvent<HTMLElement>) => {
  //   event.preventDefault();
  //   client.send(
  //     "/chat/message",
  //     {
  //       Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0aGVAbmF2ZXIuY29tIiwiYXV0aCI6IlJPTEVfVVNFUiIsImlzcyI6IlRvb2xpdiIsImlhdCI6MTY1MDYwOTM3MiwiZXhwIjoxNjUwNjk1NzcyfQ.wuAkCfw9zonGrY-1ilcwON11-1m1CWhG5oyHM6JtLF1Kqd6HiJ-aAGMVfcC1I9MfneNPn7LzTlED27nNx-gFog`,
  //     },
  //     JSON.stringify({
  //       roomId: "b472907f-122f-4db7-9617-d0d5b5671e36",
  //       sender: "인주비",
  //       contents: "hello",
  //       type: "TALK",
  //     })
  //   );
  // };

  return (
    <Container>
      <MessageContainer>message</MessageContainer>
      {/* <Editor onClick={sendMessage} /> */}
    </Container>
  );
};

export default Channel;
