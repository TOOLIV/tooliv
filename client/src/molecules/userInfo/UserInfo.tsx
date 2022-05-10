import styled from '@emotion/styled';
import Avatar from 'atoms/profile/Avatar';
import Text from 'atoms/text/Text';
import React from 'react';
import { userInfoType } from 'types/common/userTypes';
const UserBox = styled.div`
  display: flex;
  align-items: center;
`;
const AvatarBox = styled.div`
  margin-right: 12px;
`;

const UserInfo = ({
  name,
  email,
  nickname,
  profileImage,
  statusCode,
}: userInfoType) => {
  const userInfo = `${name}[${nickname}](${email})`;

  return (
    <UserBox>
      <AvatarBox>
        <Avatar size="32" src={profileImage} status={statusCode} />
      </AvatarBox>
      <Text size={14} pointer>
        {userInfo}
      </Text>
    </UserBox>
  );
};

export default UserInfo;
