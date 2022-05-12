import styled from '@emotion/styled';
import Button from 'atoms/common/Button';
import Text from 'atoms/text/Text';
import InputBox from 'molecules/inputBox/InputBox';
import { InputArea, TextBox } from 'organisms/login/LoginForm';
import { ButtonBox } from 'organisms/modal/sidemenu/WorkspaceModal';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { colors } from 'shared/color';
import { Container } from './Join';

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

const EnterPriseTest = () => {
  const [url, setUrl] = useState<string>('');
  const navigate = useNavigate();
  const inputServerNameRef = useRef<HTMLInputElement>(null);
  const inputServerUrlRef = useRef<HTMLInputElement>(null);
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setUrl(value);
  };
  const onClick = () => {
    const name = inputServerNameRef.current?.value!;
    const url = inputServerUrlRef.current?.value!;

    localStorage.setItem('baseURL', JSON.stringify({ name: name, url: url }));
    navigate(`/main`);
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
