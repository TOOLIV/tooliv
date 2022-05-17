import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import Icons from '../../atoms/common/Icons';
import Avatar from '../../atoms/profile/Avatar';
import { InnerContainer, Noti, NotiWrapper, SideWrapper } from './Channels';
import Text from 'atoms/text/Text';
import mainSrc from '../../assets/img/logo.svg';
import DirectMessageModal from 'organisms/modal/sidemenu/DirectMessageModal';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { DMInfoType } from 'types/channel/chatTypes';
import {
  channelNotiList,
  DMList,
  dmName,
  isOpenSide,
  isTutorial,
  memberStatus,
} from 'recoil/atom';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { css } from '@emotion/react';
import { channelNotiType } from 'types/channel/contentType';
import { userStatusInfoType } from 'types/common/userTypes';
import { Header } from 'organisms/sidemenu/channel/ChannelSection';
import Swal from 'sweetalert2';
import isElectron from 'is-electron';
import { electronAlert } from 'utils/electronAlert';
import { BulrContainer } from 'organisms/meeting/video/ScreenShareModal';

const FriendsContainer = styled.div`
  padding-left: 14px;
  padding-bottom: 18px;
  cursor: pointer;
`;
const FriendContainer = styled.div<{ isSelected: boolean }>`
  display: flex;
  height: 30px;
  align-items: center;
  padding: 0 16px 0 8px;
  width: 220px;
  transition: 0.3s;
  cursor: pointer;
  box-sizing: content-box;
  background-color: ${(props) => props.isSelected && props.theme.hoverColor};
  border-radius: ${(props) => props.isSelected && `10px 0 0 10px`};
  border-right: ${(props) =>
    props.isSelected && `4px solid ${props.theme.darkPointColor}`};
  ${(props) =>
    css`
      &:hover {
        background-color: ${props.theme.hoverColor};
        border-radius: 10px 0 0 10px;
        border-right: 4px solid ${props.theme.hoverColor};
      }
    `}
`;

const Container = styled.div<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
`;

const DirectMessage = () => {
  const isSideOpen = useRecoilValue<boolean>(isOpenSide);
  const [userListOpen, setUserListOpen] = useState(false);
  const dmList = useRecoilValue<DMInfoType[]>(DMList);
  const setDirectName = useSetRecoilState<string>(dmName);
  const notiList = useRecoilValue<channelNotiType[]>(channelNotiList);
  const map = new Map(notiList.map((el) => [el.channelId, el]));
  const navigate = useNavigate();
  const { workspaceId, channelId } = useParams();
  const membersStatus = useRecoilValue<userStatusInfoType>(memberStatus);
  const isTutorialOpen = useRecoilValue(isTutorial);
  const [isBulr, setIsBulr] = useState(false);
  const location = useLocation();

  const closeUserList = () => {
    setUserListOpen(false);
  };

  const clickDirectMessage = (id: string, name: string) => {
    if (location.pathname.includes('meeting')) {
      setIsBulr(true);
      isElectron()
        ? electronAlert
            .alertConfirm({
              title: '현재 미팅에 참여중입니다.',
              text: '개인 메세지로 이동하면 참여중인 미팅을 떠납니다. 정말 나가시겠습니까?',
              icon: 'warning',
            })
            .then((result) => {
              if (result.isConfirmed) {
                setDirectName(name);
                navigate(`/direct/${workspaceId}/${id}`);
              }
              setIsBulr(false);
            })
        : Swal.fire({
            title: '정말 이동하시겠습니까?',
            text: '확인 버튼 클릭 시 화상미팅이 자동으로 종료됩니다.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '확인',
            cancelButtonText: '취소',
          }).then((result) => {
            if (result.isConfirmed) {
              setDirectName(name);
              navigate(`/direct/${workspaceId}/${id}`);
            }
          });
    } else {
      setDirectName(name);
      navigate(`/direct/${workspaceId}/${id}`);
    }
  };
  return (
    <Container isOpen={isSideOpen}>
      {isBulr && <BulrContainer />}
      <Header>
        <Text size={14}>개인 메시지</Text>
        <Icons icon="plus" onClick={() => setUserListOpen(!userListOpen)} />
      </Header>
      <FriendsContainer>
        {isTutorialOpen ? (
          <FriendContainer onClick={() => {}} isSelected={false}>
            <NotiWrapper>
              <InnerContainer>
                <SideWrapper>
                  <Avatar
                    src={mainSrc}
                    // status={membersStatus[dm.receiverEmail]}
                  />
                </SideWrapper>
                <Text size={12} weight={'medium'}>
                  TOOLIV
                </Text>
              </InnerContainer>
            </NotiWrapper>
          </FriendContainer>
        ) : (
          dmList.map((dm) => (
            <FriendContainer
              key={dm.channelId}
              onClick={() => {
                clickDirectMessage(dm.channelId, dm.receiveName);
              }}
              isSelected={channelId === dm.channelId}
            >
              <NotiWrapper>
                <InnerContainer>
                  <SideWrapper>
                    <Avatar
                      src={dm.profileImage}
                      status={membersStatus[dm.receiverEmail]}
                    />
                  </SideWrapper>
                  <Text
                    size={12}
                    weight={
                      map.get(dm.channelId)?.notificationRead
                        ? 'bold'
                        : 'medium'
                    }
                  >
                    {dm.receiveName}
                  </Text>
                  {/* <Label id={dm.channelId} name={dm.receiveName} /> */}
                </InnerContainer>
                {map.get(dm.channelId)?.notificationRead && <Noti>●</Noti>}
              </NotiWrapper>
            </FriendContainer>
          ))
        )}
      </FriendsContainer>
      <DirectMessageModal isOpen={userListOpen} onClose={closeUserList} />
    </Container>
  );
};

export default DirectMessage;
