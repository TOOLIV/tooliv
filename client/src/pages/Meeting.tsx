import styled from "@emotion/styled";
import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import Chat from "../organisms/meeting/chat/Chat";
import { isOpenChat } from "../recoil/atom";

const MeetingContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: calc(100vh - 40px);
  overflow-x: hidden;
`;

const Meeting = () => {
  const [isChatOpen, setIsChatOpen] = useRecoilState(isOpenChat);

  const onOpenChat = () => {
    setIsChatOpen(true);
  };

  return (
    <MeetingContainer>
      <>
        Meeting
        {!isChatOpen && <button onClick={onOpenChat} />}
      </>
      <Chat />
    </MeetingContainer>
  );
};

export default Meeting;
