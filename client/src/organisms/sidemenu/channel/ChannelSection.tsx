import styled from '@emotion/styled';
import { getChannelList } from 'api/channelApi';
import Icons from 'atoms/common/Icons';
import Text from 'atoms/text/Text';
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
  exitChannelId,
  isOpenSide,
  isTutorial,
  modifyChannelName,
  userLog,
} from 'recoil/atom';
import { channelListTypes } from 'types/channel/contentType';
import Swal from 'sweetalert2';

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
  const exitChannel = useRecoilValue(exitChannelId);
  const [currentChannelId, setCurrentChannelId] =
    useRecoilState(currentChannel);
  const [userLogList, setUserLogList] = useRecoilState(userLog);
  const isTutorialOpen = useRecoilValue(isTutorial);
  const location = useLocation();
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
  }, [currentChannelId, modChannelName, exitChannel]);

  const openDropdownModal = () => {
    setIsDropdownModalOpen(true);
  };
  const closeDropdownModal = () => {
    setIsDropdownModalOpen(false);
  };

  const openCreateChannelModal = () => {
    setIsCreateChannelModalOpen(true);
  };

  const closeCreateChannelModal = () => {
    setIsCreateChannelModalOpen(false);
  };

  const openPublicChannelListModal = () => {
    setIsPublicChannelModalOpen(true);
  };

  const closePublicChannelListModal = () => {
    setIsPublicChannelModalOpen(false);
  };

  // 미팅 중 채널 클릭시 이벤트
  const clickChannel = (id: string) => {
    if (location.pathname.includes('meeting')) {
      setIsBulr(true);
      Swal.fire({
        title: '현재 미팅에 참여중입니다.',
        text: '다른 채널 또는 워크스페이스로 이동하면 참여중인 미팅을 떠납니다. 정말 나가시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '확인',
        cancelButtonText: '취소',
      }).then((result) => {
        if (result.isConfirmed) {
          handleClickChannel(id);
        }
        setIsBulr(false);
      });
    } else {
      handleClickChannel(id);
    }
  };

  const handleClickChannel = (id: string) => {
    setUserLogList({
      ...userLogList,
      [currentWorkspaceId]: id,
    });
    setCurrentChannelId(id);
    navigate(`${currentWorkspaceId}/${id}`);
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
        <Icons
          icon="plus"
          onClick={isTutorialOpen ? undefined : openDropdownModal}
        />
      </Header>
      <Channels
        normalChannelList={normalChannelList}
        videoChannelList={videoChannelList}
        listNum={listNum}
        onClick={clickChannel}
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
