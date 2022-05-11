import styled from '@emotion/styled';
import { workspacesType } from 'types/workspace/workspaceTypes';
import WorkSpace from '../../atoms/sidemenu/WorkSpace';
import mainSrc from '../../assets/img/logo.svg';
import { useNavigate, useParams } from 'react-router-dom';

const WorkSpaceContainer = styled.div`
  display: flex;
  /* justify-content: ; */
  align-items: flex-start;
  overflow-x: auto;
  height: 80px;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
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
        noti={true}
      />
      {workspaceList.map((workspace) => (
        <WorkSpace
          key={workspace.id}
          {...workspace}
          onClick={onClick}
          noti={workspace.noti}
        />
      ))}
      {/* </WorkSpaceWrapper> */}
    </WorkSpaceContainer>
  );
};

export default WorkSpaces;
