import styled from "@emotion/styled";
import React from "react";
import { chatItemPropsTypes } from "../../types/meeting/chatTypes";

const ChatItemContainer = styled.div`
  padding: 8px 16px 8px 16px;
`;
const ChatItemHeader = styled.div`
  display: flex;
  gap: 12px;
  font-size: 12px;
  .name {
    font-weight: 700;
  }
  .timestamp {
  }
`;

const Content = styled.div`
  margin-top: 8px;
  font-size: 16px;
`;

const ChatItem = ({ data }: chatItemPropsTypes) => {
  return (
    <ChatItemContainer>
      <ChatItemHeader>
        <div className="name">{data.name}</div>
        <div className="timestamp">{data.timestamp}</div>
      </ChatItemHeader>
      <Content>{data.content}</Content>
    </ChatItemContainer>
  );
};

export default ChatItem;
