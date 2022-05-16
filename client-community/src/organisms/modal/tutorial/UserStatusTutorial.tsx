import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Button from 'atoms/common/Button';
import Icons from 'atoms/common/Icons';
import Text from 'atoms/text/Text';
import { ReactComponent as Cover } from 'assets/img/userConfig.svg';
import { tutorialModalType } from 'types/workspace/workspaceTypes';
import ProgressBar from '@ramonak/react-progress-bar';
import { colors } from 'shared/color';
import { workspaceCreateModalOpen } from 'recoil/atom';
import { useRecoilState } from 'recoil';

const Modal = styled.div<{ isOpen: boolean }>`
  display: none;
  position: absolute;
  top: 0px;
  right: 70px;
  /* right: 30px; */
  z-index: 1;
  ${(props) =>
    props.isOpen &&
    css`
      display: block;
    `}

  :after,:before {
    left: 100%;
    top: 50%;
    border: solid transparent;
    content: '';
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  :after {
    border-color: rgba(136, 183, 213, 0);
    border-left-color: white;
    border-width: 10px;
    position: absolute;
    top: 20px;
  }
`;

const Container = styled.div`
  width: 300px;
  padding: 25px;
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 30px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const ChannelBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const ChannelWrapper = styled.div`
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background-color: ${(props) => props.theme.dropdownHoverColor};
  }
`;
const Progress = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const UserStatusTutorial = ({
  isOpen,
  onClose,
  onNext,
  progress,
}: tutorialModalType) => {
  const [workspaceCreateOpen, setWorkspaceCreateOpen] = useRecoilState(
    workspaceCreateModalOpen
  );

  const exitModal = () => {
    onClose();
  };

  const nextModal = () => {
    onNext!();
  };

  const workspaceCreate = () => {
    onClose();
    setWorkspaceCreateOpen(true);
  };
  return (
    <Modal isOpen={isOpen}>
      <Container>
        <Header>
          <Text size={18}>내 프로필</Text>
          <Icons icon="xMark" width="24" height="24" onClick={exitModal} />
        </Header>

        <ChannelBox>
          <Cover width={150} height={170} />
          {/* <Img src={src} alt="이미지" /> */}
          <Text size={14}>자신의 상태 변경 및 계정 관리를 할 수 있어요.</Text>
          <Text size={13} color="gray500">
            자신의 현재 상태(온라인, 자리비움, 오프라인)를 설정할 수 있으며,
            계정 설정이 가능합니다.
          </Text>
          <Progress>
            <ProgressBar
              completed={progress}
              customLabel=" "
              width={'200px'}
              height={'5px'}
              bgColor={colors.primary}
              baseBgColor={colors.gray200}
            />
            <Text size={12}>{`${progress}%`}</Text>
          </Progress>
          <Button
            text="워크스페이스 생성하기"
            width="230"
            height="30"
            onClick={workspaceCreate}
          />
        </ChannelBox>
      </Container>
    </Modal>
  );
};

export default UserStatusTutorial;
