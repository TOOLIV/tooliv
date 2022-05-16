import styled from '@emotion/styled';
import Tooltip from 'atoms/tooltip/Tooltip';
import { useParams } from 'react-router-dom';
import { workspaceListType } from 'types/workspace/workspaceTypes';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div<{
  isSelected: boolean;
  thumbnail: string;
}>`
  width: 40px;
  height: 40px;
  flex: 0 0 auto;
  border-radius: 10px;
  background-color: ${(props) => props.theme.bgColor};
  margin-right: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${(props) =>
    props.isSelected && `1px solid ${props.theme.pointColor}`};
  background-image: url(${(props) => props.thumbnail});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  cursor: pointer;
  &:hover {
    position: relative;
    /* opacity: 0.5; */
  }

  &:hover > div:last-child {
    opacity: 1;
  }
`;

const WorkspaceName = styled.div`
  font-size: 12px;
  text-align: center;
  /* word-break: keep-all; */
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
`;
const Noti = styled.div`
  font-size: 10px;
  color: ${(props) => props.theme.pointColor};
  position: absolute;
  top: 0;
  right: 10px;
  /* padding-left: 10px; */
`;

const WorkSpace = ({
  id,
  name,
  thumbnailImage,
  onClick,
  noti,
}: workspaceListType) => {
  // const setCurrentWorkSpaceId = useSetRecoilState(currentWorkspace);
  const { workspaceId } = useParams();
  const currentWorkSpace = workspaceId ? workspaceId : 'main';
  const handleClickWorkspace = () => {
    // setCurrentWorkSpaceId(id);
    onClick(id);
  };

  return (
    <Wrapper>
      <Container
        isSelected={id === currentWorkSpace}
        thumbnail={thumbnailImage}
        onClick={handleClickWorkspace}
      >
        {thumbnailImage ? null : <WorkspaceName>{name}</WorkspaceName>}
        <Tooltip name={name} />
      </Container>
      {noti && <Noti>●</Noti>}
    </Wrapper>
  );
};

export default WorkSpace;
