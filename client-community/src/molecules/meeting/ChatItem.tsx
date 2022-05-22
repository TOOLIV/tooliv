import styled from '@emotion/styled';
import { getUserInfo } from 'api/userApi';
import File from 'molecules/chat/File';
import React, { useEffect, useState } from 'react';
import { contentTypes } from 'types/channel/contentType';
import { colors } from 'shared/color';

const ChatItemContainer = styled.div`
  padding: 8px 16px 8px 16px;
`;
const ChatItemHeader = styled.div`
  display: flex;
  gap: 12px;
  font-size: 12px;
  .name {
    font-weight: 700;
    color: ${(props) => props.theme.textColor};
  }
  .timestamp {
    color: ${colors.gray400};
  }
`;
const Img = styled.img`
  max-width: 100%;
`;

const Content = styled.div`
  margin-top: 8px;
  font-size: 16px;
  line-height: 1.6;
  color: ${(props) => props.theme.textColor};
  word-break: break-all;
`;

const ChatItem = ({
  chatId,
  email,
  contents,
  deleted,
  sendTime,
  files,
  originFiles,
}: contentTypes) => {
  const [thumbnailImage, setThumbnailImage] = useState('');
  const [nickname, setNickname] = useState('');
  const fileTypes = ['.bmp', '.gif', '.jpg', '.png', '.jpeg', '.jfif'];

  const checkType = (file: string) => {
    const fileLen = file.length;
    const lastDot = file.lastIndexOf('.');
    const fileExt = file.substring(lastDot, fileLen).toLowerCase();
    if (fileTypes.includes(fileExt)) {
      return true;
    } else {
      return false;
    }
  };

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
        {sendTime && (
          <div className="timestamp">
            {sendTime.slice(11, 13)}:{sendTime.slice(14, 16)}
          </div>
        )}
      </ChatItemHeader>
      <Content dangerouslySetInnerHTML={{ __html: contents }} />
      {files && originFiles && files.length > 0 && (
        <Content>
          {files.map((file, i) =>
            checkType(file) ? (
              <Img key={file} src={file}></Img>
            ) : (
              <File key={file} name={originFiles[i]} url={file} />
            )
          )}
        </Content>
      )}
    </ChatItemContainer>
  );
};

export default ChatItem;
