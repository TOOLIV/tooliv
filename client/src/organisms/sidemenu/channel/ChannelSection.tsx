import styled from '@emotion/styled';
import { getChannelList } from 'api/channelApi';
import Icons from 'atoms/common/Icons';
import Text from 'atoms/text/Text';
import Channels from 'molecules/sidemenu/Channels';
import ChannelDropDown from 'organisms/modal/channel/sidemenu/ChannelDropDown';
import ChannelModal from 'organisms/modal/sidemenu/ChannelModal';
import PublicChannelListModal from 'organisms/modal/sidemenu/PublicChannelListModal';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  currentChannel,
  currentWorkspace,
  isOpenSide,
  userLog,
} from 'recoil/atom';

const Container = styled.div<{ isOpen: boolean }>`
  position: relative;
  border-bottom: ${(props) => props.isOpen && '1px solid #ffffff'};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
`;

const ChannelSection = () => {
  const isSideOpen = useRecoilValue<boolean>(isOpenSide);
  const [isDropdownModalOpen, setIsDropdownModalOpen] = useState(false);

  const [isCreateChannelModalOpen, setIsCreateChannelModalOpen] =
    useState(false);

  const [isPublicChannelModalOpen, setIsPublicChannelModalOpen] =
    useState(false);

  const [channelList, setChannelList] = useState([]);
  const currentWorkspaceId = useRecoilValue(currentWorkspace);
  const [currentChannelId, setCurrentChannelId] =
    useRecoilState(currentChannel);
  const [userLogList, setUserLogList] = useRecoilState(userLog);

  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleChannel = async () => {
    const response = await getChannelList(currentWorkspaceId);
    setChannelList(response.data.channelGetResponseDTOList);
    console.log(response);
  };

  useEffect(() => {
    if (currentChannelId) handleChannel();
  }, [currentChannelId]);

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
        <Text size={14} color="gray600">
          채널
        </Text>
        <Icons icon="plus" onClick={openDropdownModal} />
      </Header>
      <Channels channelList={channelList} onClick={handleClickChannel} />
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
