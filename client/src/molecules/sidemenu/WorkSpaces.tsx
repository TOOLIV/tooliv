import styled from '@emotion/styled';
import { workspacesType } from 'types/workspace/workspaceTypes';
import WorkSpace from '../../atoms/sidemenu/WorkSpace';
import mainSrc from '../../assets/img/logo.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { useRef } from 'react';
import ScrollHorizontal from 'react-scroll-horizontal';

const WorkSpaceContainer = styled.div`
  display: flex;
  /* justify-content: ; */
  align-items: flex-start;
  overflow-x: scroll;
  overflow-y: hidden;
  height: 90px;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
  :hover {
    &::-webkit-scrollbar {
      width: 10px;
    }
  }
`;

const WorkSpaces = ({ workspaceList, onClick }: workspacesType) => {
  const navigate = useNavigate();
  const handleClickMain = (id: string) => {
    navigate(id);
  };
  // const scrollRef = useRef<HTMLDivElement>(null);
  // scrollContainer.addEventListener('wheel', (evt) => {
  //   evt.preventDefault();
  //   scrollContainer.scrollLeft += evt.deltaY;
  // });

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
