import styled from "@emotion/styled";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import Editor from "../molecules/chat/Editor";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
const MessageContainer = styled.div`
  width: 100%;
  height: 80%;
`;
const Channel = () => {
  const navigate = useNavigate();
  let sockJS = new SockJS("http://localhost:8080/chatting");
  let client = Stomp.over(sockJS);
  useEffect(() => {
    client.connect(
      {
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0aGVAbmF2ZXIuY29tIiwiYXV0aCI6IlJPTEVfVVNFUiIsImlzcyI6IlRvb2xpdiIsImlhdCI6MTY1MDU5MDQ5NiwiZXhwIjoxNjUwNjc2ODk2fQ.OR1g0XYiogsIzsjO99MsAti74XKE7GvxKnDCddCvZGKUCq93bu3HnbVxIFq3IL8PTMBJYUjZ8-XTRVaO156LJA`,
      },
      (frame) => {
        console.log("STOMP Connection");
      }
    );
  }, []);

  return (
    <Container>
      <MessageContainer>message</MessageContainer>
      <Editor />
    </Container>
  );
};

export default Channel;
