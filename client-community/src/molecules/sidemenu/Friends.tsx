import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import Icons from '../../atoms/common/Icons';
import Avatar from '../../atoms/profile/Avatar';
import Label from '../../atoms/common/Label';
import MenuTemplate from '../../atoms/sidemenu/MenuTemplate';
import { labelType } from '../../types/common/labelType';
import { SideWrapper, TopContainer } from './Channels';
import Text from 'atoms/text/Text';
import DirectMessageModal from 'organisms/modal/sidemenu/DirectMessageModal';

const FriendsContainer = styled.div`
  padding: 16px 0;
`;
const FriendContainer = styled.div`
  display: flex;
  height: 30px;
  align-items: center;
  padding-left: 8px;
`;

const Friends = () => {
  const dummyData: labelType[] = [
    {
      id: '0',
      name: '손창현',
    },
    {
      id: '1',
      name: '이다예',
    },
  ];

  return (
    <>
      <TopContainer>
        <Text size={14}>친구</Text>
        <Icons icon="plus" />
      </TopContainer>
      <FriendsContainer>
        {dummyData.map((friend) => (
          <FriendContainer key={friend.id}>
            <SideWrapper>{/* <Avatar /> */}</SideWrapper>
            <Label {...friend} noti={true} />
          </FriendContainer>
        ))}
      </FriendsContainer>
    </>
  );
};

export default Friends;
