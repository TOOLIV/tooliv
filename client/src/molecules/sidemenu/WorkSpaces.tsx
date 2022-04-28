import styled from '@emotion/styled';
import WorkspaceModal from 'organisms/modal/WorkspaceModal';
import { useEffect, useState } from 'react';
import { workspacesType } from 'types/workspace/workspaceTypes';
import Icons from '../../atoms/common/Icons';
import WorkSpace from '../../atoms/sidemenu/WorkSpace';
import mainSrc from '../../assets/img/logo.svg';
import { useNavigate } from 'react-router-dom';
const WorkSpaceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const WorkSpaceWrapper = styled.div`
  display: flex;
  align-items: center;
  /* width: 90%; */
  flex-wrap: wrap;
  /* overflow: auto; */
`;

const WorkSpaces = ({ workspaceList, onClick }: workspacesType) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const navigate = useNavigate();

  const handleClickMain = (id: string) => {
    navigate(id);
  };

  return (
    <WorkSpaceContainer>
      <WorkSpaceWrapper>
        <WorkSpace
          id="main"
          name="홈"
          thumbnailImage={mainSrc}
          onClick={handleClickMain}
        />
        {workspaceList.map((workspace) => (
          <WorkSpace key={workspace.id} {...workspace} onClick={onClick} />
        ))}
      </WorkSpaceWrapper>
      <Icons icon="plus" onClick={handleOpenModal} />
      <WorkspaceModal isOpen={isOpen} onClose={handleCloseModal} />
    </WorkSpaceContainer>
  );
};

export default WorkSpaces;
