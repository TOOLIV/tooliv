import styled from '@emotion/styled';
import { workspacesType } from 'types/workspace/workspaceTypes';
import WorkSpace from '../../atoms/sidemenu/WorkSpace';
import mainSrc from '../../assets/img/logo.svg';
import { useNavigate } from 'react-router-dom';

const WorkSpaceContainer = styled.div`
  display: flex;
  /* justify-content: ; */
  align-items: flex-start;
  overflow: scroll;
  height: 80px;
`;

const WorkSpaceWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  /* flex-wrap: wrap; */
  /* overflow: auto; */
`;

const WorkSpaces = ({ workspaceList, onClick }: workspacesType) => {
  const navigate = useNavigate();

  const handleClickMain = (id: string) => {
    navigate(id);
  };

  return (
    <WorkSpaceContainer>
      {/* <WorkSpaceWrapper> */}
      <WorkSpace
        id="main"
        name="홈"
        thumbnailImage={mainSrc}
        onClick={handleClickMain}
      />
      {workspaceList.map((workspace) => (
        <WorkSpace key={workspace.id} {...workspace} onClick={onClick} />
      ))}
      {/* </WorkSpaceWrapper> */}
    </WorkSpaceContainer>
  );
};

export default WorkSpaces;
