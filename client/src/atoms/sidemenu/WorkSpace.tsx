import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { currentWorkspace } from 'recoil/atom';
import { colors } from 'shared/color';
import { workspaceListType } from 'types/workspace/workspaceTypes';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div<{
  isSelected: boolean;
  thumbnail: string;
  ['data-name']: string;
}>`
  width: 40px;
  height: 40px;
  flex: 0 0 auto;
  border-radius: 10px;
  background-color: ${(props) => props.theme.bgColor};
  margin: 12px 12px 12px 0;
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
  }

  &:hover:after {
    top: 130%;
    left: 0;
    opacity: 1;
  }

  &:after {
    content: attr(data-name);
    transition: bottom 0.3s ease-in-out, opacity 0.3s ease-in-out;
    background-color: black;
    box-shadow: 0px 0px 3px 1px rgba(50, 50, 50, 0.4);
    border-radius: 5px;
    display: block;
    box-sizing: border-box;
    color: #ffffff;
    font-size: 12px;
    margin-bottom: 5px;
    padding: 7px 10px;
    position: absolute;
    width: max-content;
    max-width: 300px;
    /* word-wrap: break-word; */
    text-align: center;
    z-index: 9999;

    opacity: 0;
    left: -9999px;
    top: 90%;
  }
`;

const WorkspaceName = styled.div`
  font-size: 12px;
  word-break: keep-all;
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
`;
const Noti = styled.div`
  font-size: 10px;
  color: ${colors.gray500};
  position: absolute;
  top: 10px;
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
  const setCurrentWorkSpaceId = useSetRecoilState(currentWorkspace);
  const { workspaceId } = useParams();
  const currentWorkSpace = workspaceId ? workspaceId : 'main';
  const handleClickWorkspace = () => {
    setCurrentWorkSpaceId(id);
    onClick(id);
  };

  return (
    <Wrapper>
      <Container
        isSelected={id === currentWorkSpace}
        thumbnail={thumbnailImage}
        data-name={name}
        onClick={handleClickWorkspace}
      >
        {thumbnailImage ? null : <WorkspaceName>{name}</WorkspaceName>}
      </Container>
      {!noti && <Noti>●</Noti>}
    </Wrapper>
  );
};

export default WorkSpace;
