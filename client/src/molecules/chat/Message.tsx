import styled from '@emotion/styled';
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
`;

const ContentContainer = styled.div`
  padding: 16px;
`;

const Message = ({ roomId, sender, contents, type }: contentTypes) => {
  return (
    <Container>
      <ProfileContainer>
        <SideWrapper>
          <Avatar />
        </SideWrapper>
        <Label name={sender} size="16px" />
      </ProfileContainer>
      <ContentContainer>{contents}</ContentContainer>
    </Container>
  );
};

export default Message;
