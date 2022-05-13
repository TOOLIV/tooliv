import styled from '@emotion/styled';
import { workspacesType } from 'types/workspace/workspaceTypes';
import WorkSpace from '../../atoms/sidemenu/WorkSpace';
import mainSrc from '../../assets/img/logo.svg';
import { useNavigate } from 'react-router-dom';

const WorkSpaceContainer = styled.div`
  display: flex;
  align-items: flex-start;
  overflow-x: scroll;
  overflow-y: hidden;
  /* height: 90px; */
  /* -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
  :hover {
    &::-webkit-scrollbar {
      width: 10px;
    }
  } */
`;

const WorkSpaces = ({ workspaceList, onClick }: workspacesType) => {
  const navigate = useNavigate();
  const handleClickMain = (id: string) => {
    navigate(id);
  };

  return (
    <WorkSpaceContainer>
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
    </WorkSpaceContainer>
  );
};

export default WorkSpaces;
