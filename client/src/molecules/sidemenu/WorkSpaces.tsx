import styled from '@emotion/styled';
import WorkspaceModal from 'organisms/modal/WorkspaceModal';
import { workspacesType } from 'types/workspace/workspaceTypes';
import Icons from '../../atoms/common/Icons';
import WorkSpace from '../../atoms/sidemenu/WorkSpace';

const WorkSpaceContainer = styled.div`
  display: flex;
  align-items: center;
`;

const WorkSpaces = ({ workspaceList }: workspacesType) => {
  return (
    <WorkSpaceContainer>
      {workspaceList.map((workspace) => (
        <WorkSpace key={workspace.id} {...workspace} />
      ))}
      <Icons icon="plus" />
      <WorkspaceModal />
    </WorkSpaceContainer>
  );
};

export default WorkSpaces;
