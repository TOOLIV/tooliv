import styled from '@emotion/styled';
import WorkspaceModal from 'organisms/modal/WorkspaceModal';
import { useEffect, useState } from 'react';
import { workspacesType } from 'types/workspace/workspaceTypes';
import Icons from '../../atoms/common/Icons';
import WorkSpace from '../../atoms/sidemenu/WorkSpace';

const WorkSpaceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const WorkSpaceWrapper = styled.div`
  display: flex;
  align-items: center;
  /* width: 90%; */
  flex-wrap: nowrap;
  overflow-x: scroll;
`;

const WorkSpaces = ({ workspaceList }: workspacesType) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <WorkSpaceContainer>
      <WorkSpaceWrapper>
        {workspaceList.map((workspace) => (
          <WorkSpace key={workspace.id} {...workspace} />
        ))}
      </WorkSpaceWrapper>
      <Icons icon="plus" onClick={handleOpenModal} />
      <WorkspaceModal isOpen={isOpen} onClose={handleCloseModal} />
    </WorkSpaceContainer>
  );
};

export default WorkSpaces;
