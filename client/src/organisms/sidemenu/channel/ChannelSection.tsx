import styled from '@emotion/styled';
import { getChannelList } from 'api/channelApi';
import { getWorkspaceList } from 'api/workspaceApi';
import Icons from 'atoms/common/Icons';
import MenuTemplate from 'atoms/sidemenu/MenuTemplate';
import Channels from 'molecules/sidemenu/Channels';
import WorkSpaces from 'molecules/sidemenu/WorkSpaces';
import ChannelModal from 'organisms/modal/ChannelModal';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentWorkspace, isOpenSide, userLog } from 'recoil/atom';
import { workspaceListType } from 'types/workspace/workspaceTypes';

const Container = styled.div<{ isOpen: boolean }>`
  width: 280px;
  /* padding: 16px 18px 16px 18px; */
  border-bottom: ${(props) => props.isOpen && '1px solid #ffffff'};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 18px;
`;

const ChannelSection = () => {
  const isSideOpen = useRecoilValue<boolean>(isOpenSide);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [channelList, setChannelList] = useState([]);

  const navigate = useNavigate();

  const currentWorkspaceId = useRecoilValue(currentWorkspace);
  const [userLogList, setUserLogList] = useRecoilState(userLog);
  const handleChannel = async () => {
    const response = await getChannelList(currentWorkspaceId);
    setChannelList(response.data.channelGetResponseDTOList);
    console.log(response);
  };

  useEffect(() => {
    handleChannel();
  }, [currentWorkspaceId]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleClickChannel = (id: string) => {
    setUserLogList({
      ...userLogList,
      [currentWorkspaceId]: id,
    });

    navigate(`${currentWorkspaceId}/${id}`);
  };

  return (
    <Container isOpen={isSideOpen}>
      <Header>
        <MenuTemplate title="채널" />
        <Icons icon="plus" onClick={handleOpenModal} />
      </Header>
      <Channels channelList={channelList} onClick={handleClickChannel} />
      <ChannelModal isOpen={isModalOpen} onClose={handleCloseModal} />
      {/* <WorkSpaces workspaceList={workspaceList} /> */}
    </Container>
  );
};

export default ChannelSection;
