import styled from '@emotion/styled';
import { getWorkspaceList } from 'api/workspaceApi';
import { getChannelList } from 'api/channelApi';
import Icons from 'atoms/common/Icons';
import MenuTemplate from 'atoms/sidemenu/MenuTemplate';
import WorkSpaces from 'molecules/sidemenu/WorkSpaces';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  currentChannel,
  // currentChannel,
  currentWorkspace,
  userLog,
} from 'recoil/atom';
import { workspaceListType } from 'types/workspace/workspaceTypes';
import WorkspaceModal from 'organisms/modal/sidemenu/WorkspaceModal';
import Label from 'atoms/label/Label';
import Text from 'atoms/text/Text';

const Container = styled.div<{ isOpen: boolean }>`
  padding: 16px 0;
  border-bottom: ${(props) => props.isOpen && '1px solid #ffffff'};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const WorkSpaceSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [workspaceList, setWorkspaceList] = useState<workspaceListType[]>([]);
  const [curWorkspaceId, setCurWorkspaceId] = useRecoilState(currentWorkspace);
  const setCurrentChannel = useSetRecoilState(currentChannel);
  const [userLogList, setUserLogList] = useRecoilState(userLog);
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleWorkspace = async () => {
    const response = await getWorkspaceList();
    setWorkspaceList(response.data.workspaceGetResponseDTOList);
  };

  const getNextChannelId = async (workspaceId: string) => {
    const channelList = await getChannelList(workspaceId);
    const channelId = channelList.data.channelGetResponseDTOList[0].id;
    return channelId;
  };

  const handleClickWorkspace = async (id: string) => {
    if (userLogList[id]) {
      // 워크스페이스별 마지막으로 접속한 채널
      const lastChannelId = userLogList[id];
      setCurWorkspaceId(id);
      setCurrentChannel(lastChannelId);
      navigate(`${id}/${lastChannelId}`);
    } else {
      // 워크스페이별 첫번째 채널'
      setCurWorkspaceId(id);
      const channelId = await getNextChannelId(id);
      setUserLogList({
        ...userLogList,
        [id]: channelId,
      });
      setCurrentChannel(channelId);
      navigate(`${id}/${channelId}`);
    }
  };

  useEffect(() => {
    handleWorkspace();
  }, [curWorkspaceId]);

  return (
    <Container isOpen={isOpen}>
      <Header>
        <Text size={14} color="gray600">
          워크스페이스
        </Text>
        {/* <MenuTemplate title="워크 스페이스" /> */}
        <Icons icon="plus" onClick={handleOpenModal} />
      </Header>
      <WorkSpaces
        workspaceList={workspaceList}
        onClick={handleClickWorkspace}
      />
      <WorkspaceModal isOpen={isOpen} onClose={handleCloseModal} />
    </Container>
  );
};

export default WorkSpaceSection;
