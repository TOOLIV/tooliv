import styled from '@emotion/styled';
import { getChannelList } from 'api/channelApi';
import Icons from 'atoms/common/Icons';
import Text from 'atoms/text/Text';
import Channels from 'molecules/sidemenu/Channels';
import ChannelDropDown from 'organisms/modal/channel/sidemenu/ChannelDropDown';
import ChannelModal from 'organisms/modal/sidemenu/ChannelModal';
import PublicChannelListModal from 'organisms/modal/sidemenu/PublicChannelListModal';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  currentChannel,
  currentWorkspace,
  isOpenSide,
  modifyChannelName,
  userLog,
} from 'recoil/atom';
import { channelListTypes } from 'types/channel/contentType';

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
