import styled from '@emotion/styled';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { join, login } from '../../api/userApi';
import Button from '../../atoms/common/Button';
import Text from '../../atoms/text/Text';
import InputBox from '../../molecules/inputBox/InputBox';
import { colors } from '../../shared/color';

const Container = styled.div`
  width: 480px;
  padding: 65px;
  background-color: ${colors.white};
  border-radius: 30px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.06);
`;

const TextBox = styled.div`
  margin-bottom: 30px;
`;

const InputArea = styled.form`
  & > :not(div:last-of-type) {
    margin-bottom: 15px;
  }
  margin-bottom: 30px;
`;

const SignUpBox = styled.div`
  width: 55%;
  display: flex;
  justify-content: space-between;
  margin-top: 7px;
  margin-left: auto;
`;

const JoinForm = () => {
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const email = inputEmailRef.current?.value!;
    const password = inputPasswordRef.current?.value!;

    const body = {
      email,
      password,
    };
    try {
      const response = await join(body);
      console.log(response);
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <TextBox>
        <Text size={36} weight={'bold'}>
          회원가입
        </Text>
      </TextBox>
      <InputArea>
        <InputBox
          label="이름"
          placeholder="이름을 입력해주세요."
          ref={inputEmailRef}
        />
        <InputBox
          label="이메일"
          placeholder="사용하실 이메일을 입력해주세요."
          ref={inputEmailRef}
        />
        <InputBox
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          type="password"
          ref={inputPasswordRef}
        />
      </InputArea>
      <Button width="350" text="회원가입" onClick={handleLogin} />
      <SignUpBox>
        <Text size={12} color={'gray400'}>
          이미 TOOLIV 회원이신가요?
        </Text>
        <Text size={12}>로그인</Text>
      </SignUpBox>
    </Container>
  );
};

export default JoinForm;
