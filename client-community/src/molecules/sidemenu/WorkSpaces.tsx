import styled from '@emotion/styled';
import { workspacesType } from 'types/workspace/workspaceTypes';
import WorkSpace from '../../atoms/sidemenu/WorkSpace';
import mainSrc from '../../assets/img/logo.svg';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isTutorial } from 'recoil/atom';

const WorkSpaceContainer = styled.div`
  display: flex;
  align-items: flex-start;
  overflow-x: auto;
  overflow-y: hidden;

  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
  :hover {
    &::-webkit-scrollbar {
      display: block;
    }
  }
`;

const WorkSpaces = ({ workspaceList, onClick }: workspacesType) => {
  const navigate = useNavigate();
  const isTutorialOpen = useRecoilValue(isTutorial);
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
        noti={false}
      />
      {isTutorialOpen
        ? null
        : workspaceList.map((workspace) => (
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
