import styled from '@emotion/styled';
import Button from 'atoms/common/Button';
import Message from 'molecules/chat/Message';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { isTutorial } from 'recoil/atom';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const InfoContainer = styled.div`
  width: 100%;
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40%;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 10px;
`;

const Main = () => {
  return (
    <Container>
      <Message
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
      />
    </Container>
  );
};

export default Main;
