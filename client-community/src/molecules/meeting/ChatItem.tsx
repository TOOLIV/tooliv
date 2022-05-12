import styled from '@emotion/styled';
import { getUserInfo } from 'api/userApi';
import React, { useEffect, useState } from 'react';
import { contentTypes } from 'types/channel/contentType';
import { chatItemPropsTypes } from '../../types/meeting/chatTypes';

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

const ChatItem = ({
  chatId,
  email,
  contents,
  deleted,
  sendTime,
}: contentTypes) => {
  const [thumbnailImage, setThumbnailImage] = useState('');
  const [nickname, setNickname] = useState('');

  const getUserProfile = async () => {
    const response = await getUserInfo(email);
    setThumbnailImage(response.data.profileImage);
    setNickname(response.data.nickname);
  };

  useEffect(() => {
    getUserProfile();
  }, [email]);

  return (
    <ChatItemContainer>
      <ChatItemHeader>
        <div className="name">{nickname}</div>
        <div className="timestamp">{sendTime}</div>
      </ChatItemHeader>
      <Content dangerouslySetInnerHTML={{ __html: contents }}></Content>
    </ChatItemContainer>
  );
};

export default ChatItem;
