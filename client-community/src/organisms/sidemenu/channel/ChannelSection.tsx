import styled from '@emotion/styled';
import { getChannelList } from 'api/channelApi';
import Icons from 'atoms/common/Icons';
import Text from 'atoms/text/Text';
import Channels from 'molecules/sidemenu/Channels';
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
  }, [currentChannelId, modChannelName]);

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
      Swal.fire({
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
          handleClickChannel(id);
        }
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

  return (
    <Container isOpen={isSideOpen}>
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
