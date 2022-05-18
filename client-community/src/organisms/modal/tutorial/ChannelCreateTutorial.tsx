import { css, ThemeContext } from '@emotion/react';
import styled from '@emotion/styled';
import Button from 'atoms/common/Button';
import Icons from 'atoms/common/Icons';
import Text from 'atoms/text/Text';
import { ReactComponent as Cover } from 'assets/img/channelCreate.svg';
import { tutorialModalType } from 'types/workspace/workspaceTypes';
import ProgressBar from '@ramonak/react-progress-bar';
import { colors } from 'shared/color';

const Modal = styled.div<{ isOpen: boolean }>`
  display: none;
  position: absolute;
  top: 160px;
  left: 280px;
  z-index: 1;
  ${(props) =>
    props.isOpen &&
    css`
      display: block;
    `}

  :after {
    border-top: 10px solid transparent;
    border-left: 10px solid transparent;
    border-right: 10px solid white;
    border-bottom: 10px solid transparent;
    content: '';
    position: absolute;
    top: 80px;
    left: -18px;
  }

  :before {
    border-top: 12px solid transparent;
    border-left: 12px solid transparent;
    border-right: 12px solid ${(props) => props.theme.pointColor};
    border-bottom: 12px solid transparent;
    content: '';
    position: absolute;
    top: 78px;
    left: -23px;
    z-index: 0;
  }
`;

const Container = styled.div`
  width: 300px;
  padding: 25px;
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 30px;
  border: 2px solid ${(props) => props.theme.pointColor};
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
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
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
const ChannelCreateTutorial = ({
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
          <Text size={18}>채널 생성</Text>
          <Icons icon="xMark" width="24" height="24" onClick={exitModal} />
        </Header>

        <ChannelBox>
          <Cover width={150} height={170} />
          {/* <Img src={src} alt="이미지" /> */}
          <Text size={14} weight="bold">
            + 버튼을 눌러 채널을 생성하세요.
          </Text>
          <Contents>
            <Text size={13} color="gray500">
              채널은 일반 채널과 화상 채널로 구분됩니다.
            </Text>
            <Text size={13} color="gray500">
              일반 채널은 채팅 및 파일 송·수신이 가능한 채널 공간이에요
            </Text>
            <Text size={13} color="gray500">
              화상 채널은 채팅 및 파일 송·수신뿐만 아니라 사용자들간 화상 통화도
              가능한 채널이에요.
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

export default ChannelCreateTutorial;
