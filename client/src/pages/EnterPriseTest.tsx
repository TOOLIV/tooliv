import styled from '@emotion/styled';
import Button from 'atoms/common/Button';
import Text from 'atoms/text/Text';
import InputBox from 'molecules/inputBox/InputBox';
import { InputArea, TextBox } from 'organisms/login/LoginForm';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { colors } from 'shared/color';
import enterWavy from '../assets/img/enter_wavy.svg';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.lightPrimary};
  height: 100vh;
  background-image: url(${enterWavy});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 70px;
`;

const FormContainer = styled.div`
  width: 480px;
  padding: 65px;
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 30px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: 0 auto;
`;

const EnterPriseTest = () => {
  const navigate = useNavigate();
  const inputServerNameRef = useRef<HTMLInputElement>(null);
  const inputServerUrlRef = useRef<HTMLInputElement>(null);
  const onClick = () => {
    const name = inputServerNameRef.current?.value!;
    const url = inputServerUrlRef.current?.value!;

    localStorage.setItem('baseURL', JSON.stringify({ name: name, url: url }));
    navigate(`/login`);
    window.location.reload();
  };
  return (
    <Container>
      <FormContainer>
        <TextBox>
          <Text size={36} weight={'bold'}>
            서버 등록
          </Text>
        </TextBox>
        <InputArea>
          <InputBox
            label="서버 이름"
            placeholder="서버 이름을 입력해 주세요."
            ref={inputServerNameRef}
          />
          <InputBox
            label="서버 주소"
            placeholder="ex) https://abc.def.com"
            ref={inputServerUrlRef}
          />
        </InputArea>
        <ButtonBox>
          <Button text="등록" onClick={onClick} />
          <Button
            text="취소"
            bgColor="gray200"
            onClick={() => navigate('/login')}
          />
        </ButtonBox>
      </FormContainer>
    </Container>
  );
};

export default EnterPriseTest;
