import styled from '@emotion/styled';
import Button from 'atoms/common/Button';
import Message from 'molecules/chat/Message';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { isTutorial } from 'recoil/atom';
import { ReactComponent as Cover } from 'assets/img/home.svg';
import Text from 'atoms/text/Text';
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  /* gap: 20px; */
  /* align-items: flex-end; */
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin-left: auto;
  align-items: center;
  gap: 10px;
`;
const Main = () => {
  const [isTutorialOpen, setIsTutorialOpen] = useRecoilState(isTutorial);
  return (
    <Container>
      <TextWrapper>
        <Cover width={600} height={400} />
        <Text size={21} color="darkPrimary" weight="bold">
          TOOLIV에 오신 것을 환영합니다.
        </Text>
        <Text size={16} color="gray400" weight="medium">
          다양한 워크스페이스를 생성하고, 동료를 초대해 보세요!
        </Text>
      </TextWrapper>
      <ButtonWrapper>
        <Text size={12} color="gray400">
          TOOLIV이 처음이신가요?
        </Text>
        <Button
          text="튜토리얼 시작하기"
          width="115"
          height="40"
          onClick={() => setIsTutorialOpen(!isTutorialOpen)}
        />
      </ButtonWrapper>
      {/* <Message
        chatId="0"
        deleted={false}
        updated={false}
        contents="TOOLIV에 오신 것을 환영합니다. 다양한 워크스페이스를 생성하고, 동료를
        초대해 보세요!"
        channelId="1"
        type="home"
        email="aaa"
        files={[]}
        originFiles={[]}
      /> */}
    </Container>
  );
};

export default Main;
