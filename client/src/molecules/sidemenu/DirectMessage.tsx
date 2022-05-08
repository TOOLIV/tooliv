import styled from '@emotion/styled';
import React, { useState } from 'react';
import Icons from '../../atoms/common/Icons';
import Avatar from '../../atoms/profile/Avatar';
import Label from '../../atoms/common/Label';
import MenuTemplate from '../../atoms/sidemenu/MenuTemplate';
import { labelType } from '../../types/common/labelType';
import { SideWrapper, TopContainer } from './Channels';
import Text from 'atoms/text/Text';
import DirectMessageModal from 'organisms/modal/sidemenu/DirectMessageModal';
import { useRecoilState } from 'recoil';
import { DMInfoType } from 'types/channel/chatTypes';
import { DMList } from 'recoil/atom';
import { useNavigate, useParams } from 'react-router-dom';

const FriendsContainer = styled.div`
  padding: 0 24px 16px 24px;
  cursor: pointer;
`;
const FriendContainer = styled.div`
  display: flex;
  height: 30px;
  align-items: center;
  padding-left: 8px;
`;

const DirectMessage = () => {
  const [userListOpen, setUserListOpen] = useState(false);
  const [dmList, setDmList] = useRecoilState<DMInfoType[]>(DMList);
  const navigate = useNavigate();
  const { workspaceId } = useParams();
  const closeUserList = () => {
    setUserListOpen(false);
  };

  return (
    <>
      <TopContainer>
        <Text size={14}>개인 메시지</Text>
        <Icons icon="plus" onClick={() => setUserListOpen(!userListOpen)} />
      </TopContainer>
      <FriendsContainer>
        {dmList.map((dm) => (
          <FriendContainer
            key={dm.channelId}
            onClick={() => navigate(`/direct/${workspaceId}/${dm.channelId}`)}
          >
            <SideWrapper>
              <Avatar />
            </SideWrapper>
            <Label id={dm.channelId} name={dm.receiveName} />
          </FriendContainer>
        ))}
      </FriendsContainer>
      <DirectMessageModal isOpen={userListOpen} onClose={closeUserList} />
    </>
  );
};

export default DirectMessage;
