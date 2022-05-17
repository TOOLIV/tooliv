import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { deleteWorkspaceMember } from 'api/workspaceApi';
import Text from 'atoms/text/Text';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentWorkspace } from 'recoil/atom';
import { user } from 'recoil/auth';
import { workspaceDropdownType } from 'types/workspace/workspaceTypes';
import Swal from 'sweetalert2';

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

  // 워크스페이스 떠나기 클릭시 이벤트
  const exitWorkspaceClick = () => {
    Swal.fire({
      title: '워크스페이스에서 나가시겠습니까?',
      // text: '확인 버튼 클릭 시 화상미팅이 자동으로 종료됩니다.',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        exitWorkspace();
      }
    });
  };

  const exitWorkspace = async () => {
    await deleteWorkspaceMember(workspaceId!, email);
    setCurrentWorkspaceId('main');
    navigate('/main');
    onClose();
  };

  return (
    <Modal isOpen={isOpen}>
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
        <ListItem onClick={exitWorkspaceClick}>
          <Text color="secondary" size={16} pointer>
            워크스페이스 떠나기
          </Text>
        </ListItem>
      </Container>
    </Modal>
  );
};
export default WorkspaceDropDown;
