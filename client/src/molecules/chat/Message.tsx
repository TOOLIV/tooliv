import styled from '@emotion/styled';
import { getUserInfo } from 'api/userApi';
import Time from 'atoms/chat/Time';
import React, { useEffect, useState } from 'react';
import Label from '../../atoms/common/Label';
import Avatar from '../../atoms/profile/Avatar';
import { colors } from '../../shared/color';
import { contentTypes } from '../../types/channel/contentType';
import { SideWrapper } from '../sidemenu/Channels';
import File from './File';

const Container = styled.div`
  width: 100%;
  border-radius: 10px;
  /* border: 1px solid ${colors.gray200}; */
  border: 1px solid ${(props) => props.theme.borderColor};
  padding: 16px;
  margin: 16px 0;
  transition: 0.3s;
  &:hover {
    background-color: ${colors.lightGray};
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ContentContainer = styled.div`
  padding: 16px;
  padding-left: 30px;
  line-height: 1.2;
  color: ${(props) => props.theme.textColor};
  display: flex;
`;

const Img = styled.img`
  max-width: 300px;
`;

const Message = ({
  channelId,
  sender,
  sendTime,
  contents,
  type,
  files,
  email,
  originFiles,
}: contentTypes) => {
  const [thumbnailImage, setThumbnailImage] = useState('');

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

  useEffect(() => {
    getUserProfile();
  }, [email]);

  const getUserProfile = async () => {
    const response = await getUserInfo(email);
    setThumbnailImage(response.data.profileImage);
    console.log(response);
  };
  return (
    <Container>
      <ProfileContainer>
        <SideWrapper>
          <Avatar src={thumbnailImage} />
        </SideWrapper>
        <Label name={sender} size="16px" />
        <Time time={sendTime} />
      </ProfileContainer>
      <ContentContainer
        dangerouslySetInnerHTML={{ __html: contents }}
      ></ContentContainer>
      {files && originFiles && files.length > 0 && (
        <ContentContainer>
          {files.map((file, i) =>
            checkType(file) ? (
              <Img key={file} src={file}></Img>
            ) : (
              <File key={file} name={originFiles[i]} url={file} />
            )
          )}
        </ContentContainer>
      )}
    </Container>
  );
};

export default Message;
