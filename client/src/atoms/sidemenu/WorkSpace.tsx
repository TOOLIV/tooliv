import styled from '@emotion/styled';
import Tooltip from 'atoms/tooltip/Tooltip';
import { BulrContainer } from 'organisms/meeting/video/ScreenShareModal';
import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { currentWorkspace } from 'recoil/atom';
import { workspaceListType } from 'types/workspace/workspaceTypes';
import Swal from 'sweetalert2';
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
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
    props.isSelected && `2px solid ${props.theme.pointColor}`};
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
  const setCurrentWorkSpaceId = useSetRecoilState(currentWorkspace);
  const [isBulr, setIsBulr] = useState(false);
  const location = useLocation();
  const { workspaceId } = useParams();
  const currentWorkSpace = workspaceId ? workspaceId : 'main';
  const handleClickWorkspace = () => {
    if (location.pathname.split('/')[1] === 'meeting') {
      setIsBulr(true);
      Swal.fire({
        title: '현재 미팅에 참여중입니다.',
        text: '다른 채널 또는 워크스페이스로 이동하면 참여중인 미팅을 떠납니다. 정말 나가시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '확인',
        cancelButtonText: '취소',
      }).then((result) => {
        if (result.isConfirmed) {
          setCurrentWorkSpaceId(id);
          onClick(id);
        }
        setIsBulr(false);
      });
    } else {
      setCurrentWorkSpaceId(id);
      onClick(id);
    }
  };

  return (
    <Wrapper>
      {isBulr && <BulrContainer />}
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
