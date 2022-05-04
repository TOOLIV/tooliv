import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { deleteWorkspaceMember } from 'api/workspaceApi';
import Text from 'atoms/text/Text';
import { forwardRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentWorkspace } from 'recoil/atom';
import { user } from 'recoil/auth';
import { colors } from 'shared/color';
import { workspaceDropdownType } from 'types/workspace/workspaceTypes';

const Modal = styled.div<{ isOpen: boolean }>`
  display: none;
  position: absolute;
  top: 50px;

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

const WorkspaceDropDown = forwardRef<HTMLDivElement, workspaceDropdownType>(
  (
    { isOpen, onClose, openMemberList, openAddMemberModal, openModifyModal },
    ref
  ) => {
    const { workspaceId } = useParams();
    const setCurrentWorkspaceId = useSetRecoilState(currentWorkspace);
    const { email } = useRecoilValue(user);
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

    const exitWorkspace = async () => {
      await deleteWorkspaceMember(workspaceId!, email);
      setCurrentWorkspaceId('main');
      navigate('/main');
      onClose();
    };

    useEffect(() => {}, [workspaceId]);

    return (
      <Modal isOpen={isOpen} ref={ref}>
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
          <ListItem onClick={handleModifyModal}>
            <Text size={16} pointer>
              워크스페이스 수정
            </Text>
          </ListItem>
          <ListItem onClick={() => exitWorkspace()}>
            <Text color="secondary" size={16} pointer>
              워크스페이스 떠나기
            </Text>
          </ListItem>
        </Container>
      </Modal>
    );
  }
);

export default WorkspaceDropDown;
