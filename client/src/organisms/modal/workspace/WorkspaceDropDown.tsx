import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { deleteWorkspaceMember } from 'api/workspaceApi';
import Text from 'atoms/text/Text';
import isElectron from 'is-electron';
import { BulrContainer } from 'organisms/meeting/video/ScreenShareModal';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentWorkspace } from 'recoil/atom';
import { user } from 'recoil/auth';
import { workspaceDropdownType } from 'types/workspace/workspaceTypes';
import { electronAlert } from 'utils/electronAlert';

const Modal = styled.div<{ isOpen: boolean }>`
  display: none;
  position: absolute;
  top: 50px;
  z-index: 1;

  ${(props) =>
    props.isOpen &&
    css`
      display: block;
    `}
`;

const Container = styled.div`
  width: 200px;
  padding: 15px 0;
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.borderColor};
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ListItem = styled.div`
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.dropdownHoverColor};
  }
`;

const WorkspaceDropDown = ({
  isOpen,
  onClose,
  openMemberList,
  openAddMemberModal,
  openModifyModal,
}: workspaceDropdownType) => {
  const { workspaceId } = useParams();
  const setCurrentWorkspaceId = useSetRecoilState(currentWorkspace);
  const { email, userCode } = useRecoilValue(user);
  const [isBulr, setIsBulr] = useState(false);

  const navigate = useNavigate();
  const handleMemberList = () => {
    openMemberList();
    onClose();
  };
  const handleAddMemberModal = () => {
    openAddMemberModal();
    onClose();
  };

  const handleModifyModal = () => {
    openModifyModal();
    onClose();
  };

  const exitWorkspace = () => {
    const exit = async () => {
      await deleteWorkspaceMember(workspaceId!, email);
      setCurrentWorkspaceId('main');
      navigate('/main');
      onClose();
    };
    setIsBulr(true);
    isElectron()
      ? electronAlert
          .alertConfirm({
            title: '워크스페이스 탈퇴 확인',
            text: '해당 워크스페이스를 떠나시겠습니까?',
            icon: 'warning',
          })
          .then((result) => {
            if (result.isConfirmed) {
              exit();
            }
            setIsBulr(false);
          })
      : /* 여기에 웹에서 쓸 alert 넣어주세요 */
        console.log('');

    /* -------------------------  */
  };

  return (
    <Modal isOpen={isOpen}>
      {isBulr && <BulrContainer />}
      <Container>
        <ListItem onClick={handleMemberList}>
          <Text size={16} pointer>
            멤버 목록
          </Text>
        </ListItem>
        <ListItem onClick={handleAddMemberModal}>
          <Text size={16} pointer>
            멤버 초대
          </Text>
        </ListItem>
        {userCode === 'ADMIN' || userCode === 'MANAGER' ? (
          <ListItem onClick={handleModifyModal}>
            <Text size={16} pointer>
              워크스페이스 수정
            </Text>
          </ListItem>
        ) : null}
        <ListItem onClick={() => exitWorkspace()}>
          <Text color="secondary" size={16} pointer>
            워크스페이스 떠나기
          </Text>
        </ListItem>
      </Container>
    </Modal>
  );
};
export default WorkspaceDropDown;
