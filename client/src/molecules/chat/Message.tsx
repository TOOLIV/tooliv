import styled from '@emotion/styled';
import Time from 'atoms/chat/Time';
import React from 'react';
import Label from '../../atoms/common/Label';
import Avatar from '../../atoms/profile/Avatar';
import { colors } from '../../shared/color';
import { contentTypes } from '../../types/channel/contentType';
import { SideWrapper } from '../sidemenu/Channels';

const Container = styled.div`
  width: 100%;
  border-radius: 10px;
  border: 1px solid ${colors.gray200};
  padding: 16px;
  margin: 16px 0;
  transition: 0.3s;
  &:hover {
    background-color: ${colors.gray25};
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
`;

const File = styled.img`
  max-width: 300px;
`;

const Message = ({
  channelId,
  sender,
  sendTime,
  contents,
  type,
  files,
}: contentTypes) => {
  return (
    <Container>
      <ProfileContainer>
        <SideWrapper>
          <Avatar />
        </SideWrapper>
        <Label name={sender} size="16px" />
        <Time time={sendTime} />
      </ProfileContainer>
      <ContentContainer
        dangerouslySetInnerHTML={{ __html: contents }}
      ></ContentContainer>
      {files && files.length > 0 && (
        <ContentContainer>
          {files.map((file) => (
            <File src={file}></File>
          ))}
        </ContentContainer>
      )}
    </Container>
  );
};

export default Message;
