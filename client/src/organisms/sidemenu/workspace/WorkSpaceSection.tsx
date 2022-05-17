import styled from '@emotion/styled';
import { getWorkspaceList } from 'api/workspaceApi';
import { getChannelList } from 'api/channelApi';
import Icons from 'atoms/common/Icons';
import WorkSpaces from 'molecules/sidemenu/WorkSpaces';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  channelNotiList,
  currentChannel,
  // currentChannel,
  currentWorkspace,
  DMList,
  isOpenSide,
  isTutorial,
  modifyWorkspaceName,
  userLog,
  workspaceCreateModalOpen,
  wsList,
} from 'recoil/atom';
import { workspaceListType } from 'types/workspace/workspaceTypes';
import WorkspaceModal from 'organisms/modal/sidemenu/WorkspaceModal';
import Text from 'atoms/text/Text';
import { channelNotiType } from 'types/channel/contentType';
import { getChannels, getDMList } from 'api/chatApi';
import { DMInfoType } from 'types/channel/chatTypes';
import { user } from 'recoil/auth';
import Swal from 'sweetalert2';

const Container = styled.div<{ isOpen: boolean }>`
  padding-top: 16px;
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  height: 100px;
  margin-bottom: 10px;
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
  const [workspaceCreateOpen, setWorkspaceCreateOpen] = useRecoilState(
    workspaceCreateModalOpen
  );
  const [notiList, setNotiList] =
    useRecoilState<channelNotiType[]>(channelNotiList);
  const [dMList, setDmList] = useRecoilState<DMInfoType[]>(DMList);
  const userInfo = useRecoilValue(user);
  const isTutorialOpen = useRecoilValue(isTutorial);

  const navigate = useNavigate();
  const location = useLocation();

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

  // 미팅 중 워크스페이스 클릭시 이벤트
  const clickWorkspace = (id: string) => {
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
          handleClickWorkspace(id);
        }
      });
    } else {
      handleClickWorkspace(id);
    }
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

  useEffect(() => {
    if (workspaceCreateOpen) {
      setIsOpen(true);
      setWorkspaceCreateOpen(false);
    }
  }, [workspaceCreateOpen]);
  return (
    <Container isOpen={isSideOpen}>
      <Header>
        <Text size={14}>워크스페이스</Text>
        <Icons
          icon="plus"
          onClick={isTutorialOpen ? undefined : handleOpenModal}
        />
      </Header>
      <WorkSpaces workspaceList={workspaceList} onClick={clickWorkspace} />
      <WorkspaceModal isOpen={isOpen} onClose={handleCloseModal} />
    </Container>
  );
};

export default WorkSpaceSection;
