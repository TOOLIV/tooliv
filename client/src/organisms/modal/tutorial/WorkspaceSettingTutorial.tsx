import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Button from 'atoms/common/Button';
import Icons from 'atoms/common/Icons';
import Text from 'atoms/text/Text';
import { ReactComponent as Cover } from 'assets/img/workspaceSetting.svg';
import { tutorialModalType } from 'types/workspace/workspaceTypes';
import ProgressBar from '@ramonak/react-progress-bar';
import { colors } from 'shared/color';

const Modal = styled.div<{ isOpen: boolean }>`
  display: none;
  position: absolute;
  top: 55px;
  left: 140px;
  z-index: 1;
  ${(props) =>
    props.isOpen &&
    css`
      display: block;
    `}

  :after,:before {
    right: 100%;
    top: 50%;
    border: solid transparent;
    content: '';
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  :after {
    border-right-color: ${(props) => props.theme.borderColor};
    border-width: 10px;
    position: absolute;
    top: 40px;
  }
`;

const Container = styled.div`
  width: 300px;
  padding: 25px;
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 30px;
  border: 1px solid ${(props) => props.theme.borderColor};
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
  /* height: 30vh; */
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

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const WorkspaceSettingTutorial = ({
  isOpen,
  onClose,
  onNext,
  progress,
}: tutorialModalType) => {
  const exitModal = () => {
    onClose();
  };

  const nextModal = () => {
    onNext!();
  };
  return (
    <Modal isOpen={isOpen}>
      <Container>
        <Header>
          <Text size={18}>워크스페이스 설정</Text>
          <Icons icon="xMark" width="24" height="24" onClick={exitModal} />
        </Header>

        <ChannelBox>
          <Cover width={150} height={170} />
          {/* <Img src={src} alt="이미지" /> */}
          <Text size={14}>
            워크스페이스를 클릭하여 다양한 기능을 진행하세요.
          </Text>
          <Contents>
            <Text size={13} color="gray500">
              워크스페이스의 구성원을 확인하거나 동료를 초대할 수 있습니다.
            </Text>
            <Text size={13} color="gray500">
              더 이상 해당 워크스페이스에 남아있길 원하지 않는다면 언제든지 나갈
              수 있습니다.
            </Text>
          </Contents>
          <Progress>
            <ProgressBar
              completed={progress}
              customLabel=" "
              width={'200px'}
              height={'5px'}
              bgColor={colors.primary}
              baseBgColor={colors.gray200}
            />
            <Text size={13}>{`${progress}%`}</Text>
          </Progress>
          <Button
            text="네 이해했어요!"
            width="120"
            height="30"
            onClick={nextModal}
          />
        </ChannelBox>
      </Container>
    </Modal>
  );
};

export default WorkspaceSettingTutorial;
