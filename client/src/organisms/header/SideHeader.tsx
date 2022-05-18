import styled from '@emotion/styled';
import { getWorkspaceInfo, getWorkspaceUserCode } from 'api/workspaceApi';
import Icons from 'atoms/common/Icons';
import Text from 'atoms/text/Text';
import WorkspaceAddMemberModal from 'organisms/modal/workspace/WorkspaceAddMemberModal';
import WorkspaceDropDown from 'organisms/modal/workspace/WorkspaceDropDown';
import WorkspaceMemberListModal from 'organisms/modal/workspace/WorkspaceMemberListModal';
import WorkspaceModifyModal from 'organisms/modal/workspace/WorkspaceModifyModal';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  currentWorkspace,
  isOpenSide,
  isTutorial,
  modifyWorkspaceName,
} from 'recoil/atom';

const Container = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  position: relative;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
`;
const DropdownWrapper = styled.div``;

const SideHeader = () => {
  const [isOpen, setIsOpen] = useRecoilState<boolean>(isOpenSide);
  const [modifyModalOpen, setModifyModalOpen] = useState(false);
  const currentWorkspaceId = useRecoilValue(currentWorkspace);
  const modWorkspaceName = useRecoilValue(modifyWorkspaceName);
  const isTutorialOpen = useRecoilValue(isTutorial);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [memberListOpen, setMemberListOpen] = useState(false);
  const [addMemberModalOpen, setAddMemberModalOpen] = useState(false);
  const [workspaceName, setWorkspaceName] = useState('홈');
  const [thumbnailImage, setThumbnailImage] = useState('');
  const [userCode, setUserCode] = useState('');

  const dropdownRef = useRef<HTMLDivElement>(null);
  const { workspaceId } = useParams();
  const location = useLocation();

  const handleClickOutside = ({ target }: any) => {
    if (dropdownOpen && !dropdownRef.current?.contains(target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleWorkspaceInfo = useCallback(async () => {
    const { data } = await getWorkspaceInfo(currentWorkspaceId);
    setWorkspaceName(data.name);
    setThumbnailImage(data.thumbnailImage);
  }, [currentWorkspaceId]);

  useEffect(() => {
    if (workspaceId && currentWorkspaceId !== 'main') {
      handleWorkspaceInfo();
      getUserCode();
    } else {
      setWorkspaceName('홈');
      setUserCode('');
    }
  }, [currentWorkspaceId, handleWorkspaceInfo, modWorkspaceName, workspaceId]);

  const getUserCode = async () => {
    const { data } = await getWorkspaceUserCode(workspaceId!);
    setUserCode(data.workspaceMemberCode);
  };

  const onClickSide = () => {
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const openWorkspaceMemberList = () => {
    setMemberListOpen(true);
  };
  const closeWorkspaceMemberList = () => {
    setMemberListOpen(false);
  };
  const openAddMemberModal = () => {
    setAddMemberModalOpen(true);
  };
  const closeAddMemberModal = () => {
    setAddMemberModalOpen(false);
  };

  const openModifyModal = () => {
    setModifyModalOpen(true);
  };
  const closeModifyModal = () => {
    setModifyModalOpen(false);
  };

  return (
    <Container isOpen={isOpen}>
      <DropdownWrapper ref={dropdownRef}>
        <Title
          onClick={
            location.pathname.includes('admin') ||
            location.pathname.includes('main') ||
            isTutorialOpen
              ? undefined
              : () => setDropdownOpen(!dropdownOpen)
          }
        >
          {location.pathname.includes('admin') ? (
            <Text size={18} weight="700">
              관리자채널
            </Text>
          ) : isTutorialOpen ? (
            <Text size={21} weight="700" pointer={true}>
              튜토리얼
            </Text>
          ) : (
            <Text
              size={21}
              weight="700"
              pointer={currentWorkspaceId !== 'main'}
            >
              {workspaceName}
            </Text>
          )}
          {currentWorkspaceId !== 'main' || isTutorialOpen ? (
            <Icons width="21" height="21" icon="dropdown" />
          ) : null}
        </Title>
        <WorkspaceDropDown
          isOpen={dropdownOpen}
          onClose={closeDropdown}
          openMemberList={openWorkspaceMemberList}
          openAddMemberModal={openAddMemberModal}
          openModifyModal={openModifyModal}
        />
      </DropdownWrapper>
      <Icons
        icon={isOpen ? 'anglesLeft' : 'anglesRight'}
        onClick={onClickSide}
      />
      {currentWorkspaceId !== 'main' || isTutorialOpen ? (
        <>
          <WorkspaceMemberListModal
            isOpen={memberListOpen}
            onClose={closeWorkspaceMemberList}
          />
          <WorkspaceAddMemberModal
            isOpen={addMemberModalOpen}
            onClose={closeAddMemberModal}
          />
          <WorkspaceModifyModal
            isOpen={modifyModalOpen}
            onClose={closeModifyModal}
            workspaceName={workspaceName}
            thumbnailImage={thumbnailImage}
          />
        </>
      ) : null}
    </Container>
  );
};

export default SideHeader;
