import styled from '@emotion/styled';
import { getChannelList } from 'api/channelApi';
import Icons from 'atoms/common/Icons';
import Text from 'atoms/text/Text';
import isElectron from 'is-electron';
import Channels from 'molecules/sidemenu/Channels';
import { BulrContainer } from 'organisms/meeting/video/ScreenShareModal';
import ChannelDropDown from 'organisms/modal/channel/sidemenu/ChannelDropDown';
import ChannelModal from 'organisms/modal/sidemenu/ChannelModal';
import PublicChannelListModal from 'organisms/modal/sidemenu/PublicChannelListModal';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  currentChannel,
  currentWorkspace,
  isOpenSide,
  modifyChannelName,
  userLog,
} from 'recoil/atom';
import { channelListTypes } from 'types/channel/contentType';
import { electronAlert } from 'utils/electronAlert';

const Container = styled.div<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  padding-right: 16px;
`;

const ChannelSection = () => {
  const [isBulr, setIsBulr] = useState(false);
  const location = useLocation();
  const isSideOpen = useRecoilValue<boolean>(isOpenSide);
  const [isDropdownModalOpen, setIsDropdownModalOpen] = useState(false);

  const [isCreateChannelModalOpen, setIsCreateChannelModalOpen] =
    useState(false);

  const [isPublicChannelModalOpen, setIsPublicChannelModalOpen] =
    useState(false);

  const [normalChannelList, setNormalChannelList] = useState<
    channelListTypes[]
  >([]);
  const [videoChannelList, setVideoChannelList] = useState<channelListTypes[]>(
    []
  );
  const [listNum, setListNum] = useState(0);
  const currentWorkspaceId = useRecoilValue(currentWorkspace);
  const modChannelName = useRecoilValue(modifyChannelName);
  const [currentChannelId, setCurrentChannelId] =
    useRecoilState(currentChannel);
  const [userLogList, setUserLogList] = useRecoilState(userLog);

  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleChannel = async () => {
    const response = await getChannelList(currentWorkspaceId);
    const channelList = response.data.channelGetResponseDTOList;
    const normalList: channelListTypes[] = [];
    const videoList: channelListTypes[] = [];

    channelList.forEach((list: channelListTypes) => {
      if (list.channelCode === 'CHAT') {
        normalList.push(list);
      } else {
        videoList.push(list);
      }
    });
    setNormalChannelList(normalList);
    setVideoChannelList(videoList);
    setListNum(normalList.length);
  };

  useEffect(() => {
    if (currentChannelId) {
      handleChannel();
    }
  }, [currentChannelId, modChannelName]);

  const openDropdownModal = () => {
    setIsDropdownModalOpen(true);
  };
  const closeDropdownModal = () => {
    setIsDropdownModalOpen(false);
  };

  const openCreateChannelModal = () => {
    if (location.pathname.split('/')[1] === 'meeting') {
      setIsBulr(true);
      isElectron()
        ? electronAlert
            .alertConfirm({
              title: '현재 미팅에 참여중입니다.',
              text: '새 채널을 생성하면 생성된 채널로 이동되며 참여중인 미팅을 떠납니다. 정말 생성하시겠습니까?',
              icon: 'warning',
            })
            .then((result) => {
              if (result.isConfirmed) {
                setIsCreateChannelModalOpen(true);
              }
              setIsBulr(false);
            })
        : /* -------------------------  */
          /* 여기에 웹에서 쓸 alert 넣어주세요 */
          console.log('');

      /* -------------------------  */
    } else {
      setIsCreateChannelModalOpen(true);
    }
  };

  const closeCreateChannelModal = () => {
    setIsCreateChannelModalOpen(false);
  };

  const openPublicChannelListModal = () => {
    if (location.pathname.split('/')[1] === 'meeting') {
      setIsBulr(true);
      isElectron()
        ? electronAlert
            .alertConfirm({
              title: '현재 미팅에 참여중입니다.',
              text: '공개된 채널에 참여하면 해당 채널로 이동되며 참여중인 미팅을 떠납니다. 정말 참여하시겠습니까?',
              icon: 'warning',
            })
            .then((result) => {
              if (result.isConfirmed) {
                setIsPublicChannelModalOpen(true);
              }
              setIsBulr(false);
            })
        : /* -------------------------  */
          /* 여기에 웹에서 쓸 alert 넣어주세요 */
          console.log('');

      /* -------------------------  */
    } else {
      setIsPublicChannelModalOpen(true);
    }
  };

  const closePublicChannelListModal = () => {
    setIsPublicChannelModalOpen(false);
  };

  const handleClickChannel = (id: string) => {
    if (location.pathname.split('/')[1] === 'meeting') {
      setIsBulr(true);
      isElectron()
        ? electronAlert
            .alertConfirm({
              title: '현재 미팅에 참여중입니다.',
              text: '다른 채널 또는 워크스페이스로 이동하면 참여중인 미팅을 떠납니다. 정말 나가시겠습니까?',
              icon: 'warning',
            })
            .then((result) => {
              if (result.isConfirmed) {
                setUserLogList({
                  ...userLogList,
                  [currentWorkspaceId]: id,
                });
                setCurrentChannelId(id);
                navigate(`${currentWorkspaceId}/${id}`);
              }
              setIsBulr(false);
            })
        : /* -------------------------  */
          /* 여기에 웹에서 쓸 alert 넣어주세요 */
          console.log('');

      /* -------------------------  */
    } else {
      setUserLogList({
        ...userLogList,
        [currentWorkspaceId]: id,
      });
      setCurrentChannelId(id);
      navigate(`${currentWorkspaceId}/${id}`);
    }
  };

  const handleClickOutside = ({ target }: any) => {
    if (isDropdownModalOpen && !dropdownRef.current?.contains(target)) {
      setIsDropdownModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownModalOpen]);

  return (
    <Container isOpen={isSideOpen}>
      {isBulr && <BulrContainer />}
      <Header>
        <Text size={14}>채널</Text>
        <Icons icon="plus" onClick={openDropdownModal} />
      </Header>
      <Channels
        normalChannelList={normalChannelList}
        videoChannelList={videoChannelList}
        listNum={listNum}
        onClick={handleClickChannel}
      />
      <ChannelDropDown
        isOpen={isDropdownModalOpen}
        onClose={closeDropdownModal}
        openCreateChannelModal={openCreateChannelModal}
        openPublicChannelListModal={openPublicChannelListModal}
      />
      <ChannelModal
        isOpen={isCreateChannelModalOpen}
        onClose={closeCreateChannelModal}
      />
      <PublicChannelListModal
        isOpen={isPublicChannelModalOpen}
        onClose={closePublicChannelListModal}
      />
    </Container>
  );
};

export default ChannelSection;
