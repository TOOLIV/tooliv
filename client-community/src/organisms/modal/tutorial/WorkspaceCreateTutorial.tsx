import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Button from 'atoms/common/Button';
import Icons from 'atoms/common/Icons';
import Text from 'atoms/text/Text';
import { ReactComponent as Cover } from 'assets/img/workspaceCreate.svg';
import { tutorialModalType } from 'types/workspace/workspaceTypes';
import ProgressBar from '@ramonak/react-progress-bar';
import { colors } from 'shared/color';

const Modal = styled.div<{ isOpen: boolean }>`
  display: none;
  position: absolute;
  top: 105px;
  left: 280px;
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
    border-color: rgba(136, 183, 213, 0);
    border-right-color: white;
    border-width: 10px;
    margin-top: -150px;
  }
`;

const Container = styled.div`
  width: 300px;
  padding: 20px 25px;
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
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
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
const WorkspaceCreateTutorial = ({
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
          <Text size={18}>워크스페이스 생성</Text>
          <Icons icon="xMark" width="24" height="24" onClick={exitModal} />
        </Header>

        <ChannelBox>
          <Cover width={130} height={150} />
          {/* <Img src={src} alt="이미지" /> */}
          <Text size={14} weight="bold">
            + 버튼을 눌러 워크스페이스를 생성하세요.
          </Text>
          <Text size={13} color="gray500">
            워크스페이스는 팀별 소통 공간이에요. 워크스페이스를 대표할 사진과
            이름을 설정하고 동료들과 함께 하세요.
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

export default WorkspaceCreateTutorial;
