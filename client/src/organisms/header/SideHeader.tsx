import styled from '@emotion/styled';
import Icons from 'atoms/common/Icons';
import Text from 'atoms/text/Text';
import WorkspaceAddMemberModal from 'organisms/modal/workspace/WorkspaceAddMemberModal';
import WorkspaceDropDown from 'organisms/modal/workspace/WorkspaceDropDown';
import WorkspaceMemberListModal from 'organisms/modal/workspace/WorkspaceMemberListModal';
import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentWorkspace, isOpenSide } from 'recoil/atom';

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

const SideHeader = () => {
  const [isOpen, setIsOpen] = useRecoilState<boolean>(isOpenSide);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [memberListOpen, setMemberListOpen] = useState(false);
  const [addMemberModalOpen, setAddMemberModalOpen] = useState(false);

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
  return (
    <Container isOpen={isOpen}>
      <Title>
        <Text size={24} weight="700" pointer>
          홈
        </Text>
        <Icons icon="dropdown" onClick={() => setDropdownOpen(!dropdownOpen)} />
      </Title>
      <Icons
        icon={isOpen ? 'anglesLeft' : 'anglesRight'}
        onClick={onClickSide}
      />
      <WorkspaceDropDown
        isOpen={dropdownOpen}
        onClose={closeDropdown}
        openMemberList={openWorkspaceMemberList}
        openAddMemberModal={openAddMemberModal}
      />
      <WorkspaceMemberListModal
        isOpen={memberListOpen}
        onClose={closeWorkspaceMemberList}
      />
      <WorkspaceAddMemberModal
        isOpen={addMemberModalOpen}
        onClose={closeAddMemberModal}
      />
    </Container>
  );
};

export default SideHeader;
