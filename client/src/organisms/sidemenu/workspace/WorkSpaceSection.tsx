import styled from '@emotion/styled';
import { getWorkspaceList } from 'api/workspaceApi';
import { getChannelList } from 'api/channelApi';
import Icons from 'atoms/common/Icons';
import WorkSpaces from 'molecules/sidemenu/WorkSpaces';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  channelNotiList,
  currentChannel,
  // currentChannel,
  currentWorkspace,
  DMList,
  isOpenSide,
  modifyWorkspaceName,
  userLog,
  wsList,
} from 'recoil/atom';
import { workspaceListType } from 'types/workspace/workspaceTypes';
import WorkspaceModal from 'organisms/modal/sidemenu/WorkspaceModal';
import Text from 'atoms/text/Text';
import { channelNotiType } from 'types/channel/contentType';
import { getChannels, getDMList } from 'api/chatApi';
import { DMInfoType } from 'types/channel/chatTypes';
import { user } from 'recoil/auth';

const Container = styled.div<{ isOpen: boolean }>`
  padding-top: 16px;
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const WorkSpaceSection = () => {
  const isSideOpen = useRecoilValue<boolean>(isOpenSide);
  const [isOpen, setIsOpen] = useState(false);
  const [workspaceList, setWorkspaceList] =
    useRecoilState<workspaceListType[]>(wsList);
  const [curWorkspaceId, setCurWorkspaceId] = useRecoilState(currentWorkspace);
  const setCurrentChannel = useSetRecoilState(currentChannel);
  const [userLogList, setUserLogList] = useRecoilState(userLog);
  const modWorkspaceName = useRecoilValue(modifyWorkspaceName);
  const [notiList, setNotiList] =
    useRecoilState<channelNotiType[]>(channelNotiList);
  const [dMList, setDmList] = useRecoilState<DMInfoType[]>(DMList);
  const userInfo = useRecoilValue(user);
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleWorkspace = async () => {
    const chaRes = await getChannels(userInfo.email);
    const dmRes = await getDMList(userInfo.email);
    const response = await getWorkspaceList();

    const {
      data: { notificationChannelList },
    } = chaRes;
    const {
      data: { directInfoDTOList },
    } = dmRes;

    const newNotiList = [...notificationChannelList, ...directInfoDTOList];

    setDmList(directInfoDTOList);
    setNotiList(newNotiList);
    console.log(notificationChannelList);

    const notiWorkspace = newNotiList.filter((noti) => {
      if (noti.notificationRead) {
        return noti;
      }
      return null;
    });

    const map = new Map(notiWorkspace.map((el) => [el.workspaceId, el]));
    const newWSList = response.data.workspaceGetResponseDTOList.map(
      (dto: any) => {
        if (map.get(dto.id)) {
          return { ...dto, noti: true };
        } else {
          return { ...dto, noti: false };
        }
      }
    );
    setWorkspaceList(newWSList);
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
      // setWorkspaceList(
      //   workspaceList.map((dto: any) => {
      //     console.log(dto.id, id);
      //     if (id === dto.id) {
      //       return { ...dto, noti: false };
      //     } else return dto;
      //   })
      // );
      navigate(`${id}/${channelId}`);
    }
  };

  useEffect(() => {
    if (curWorkspaceId) handleWorkspace();
  }, [curWorkspaceId, modWorkspaceName]);

  return (
    <Container isOpen={isSideOpen}>
      <Header>
        <Text size={14}>워크스페이스</Text>
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
