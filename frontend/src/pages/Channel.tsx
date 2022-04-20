import styled from "@emotion/styled";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isOpenSide } from "../recoil/atom";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import axios from "axios";

const Container = styled.div<{ isOpen: boolean }>`
  width: 100%;
  position: absolute;
  margin-top: 30px;
  margin-left: ${(props) => (props.isOpen ? "340px" : "60px")};
`;

const Channel = () => {
  const [isOpen, setIsOpen] = useRecoilState<boolean>(isOpenSide);
  const navigate = useNavigate();
  let sockJS = new SockJS("http://localhost:8080/chatting");
  let client = Stomp.over(sockJS);
  useEffect(() => {
    // axios.get(`http://localhost:8080/api/admin/list/user`, {
    //   headers: {
    //     Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJpczJkbzNvYkBnbWFpbC5jb20iLCJhdXRoIjoiIiwiaXNzIjoiVG9vbGl2IiwiaWF0IjoxNjUwNDQ1MTkxLCJleHAiOjE2NTA1MzE1OTF9.ssNtMtyMVULNRNLQJywIL5EgFeQIFfjnHlCC6KAnjqnGdO2kC2E2hQCQp3YAIOH7xsik7I9FRL-uiNP3Gl2vBA`,
    //   },
    // });

    client.connect(
      {
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJpczJkbzNvYkBnbWFpbC5jb20iLCJhdXRoIjoiIiwiaXNzIjoiVG9vbGl2IiwiaWF0IjoxNjUwNDQ1MTkxLCJleHAiOjE2NTA1MzE1OTF9.ssNtMtyMVULNRNLQJywIL5EgFeQIFfjnHlCC6KAnjqnGdO2kC2E2hQCQp3YAIOH7xsik7I9FRL-uiNP3Gl2vBA`,
      },
      (frame) => {
        console.log("STOMP Connection");
      }
    );
  }, []);

  return <Container isOpen={isOpen}>Channel</Container>;
};

export default Channel;
