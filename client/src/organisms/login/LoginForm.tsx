import styled from '@emotion/styled';
import isElectron from 'is-electron';
import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { memberStatus } from 'recoil/atom';
import { user } from 'recoil/auth';
import { login } from '../../api/userApi';
import Button from '../../atoms/common/Button';
import Text from '../../atoms/text/Text';
import InputBox from '../../molecules/inputBox/InputBox';

const Container = styled.div`
  width: 480px;
  padding: 65px;
  background-color: ${(props) => props.theme.loginFormBgColor};
  border-radius: 30px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.06);

  a {
    text-decoration: none;
    color: black;
  }
`;

export const TextBox = styled.div`
  margin-bottom: 30px;
`;

export const InputArea = styled.form`
  & > div:first-of-type {
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

const LoginForm = () => {
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const setUser = useSetRecoilState(user);
  const [membersStatus, setMembersStatus] = useRecoilState(memberStatus);
  const isEnterprise = localStorage.getItem('baseURL') ? true : false;
  const server = localStorage.getItem('baseURL');
  const serverName: string = server && JSON.parse(server).name;

  const handleLogin = async () => {
    const email = inputEmailRef.current?.value!;
    const password = inputPasswordRef.current?.value!;

    const body = {
      email,
      password,
    };
    try {
      if (!email) {
        alert('이메일을 입력해주세요.');
        inputEmailRef.current?.focus();
      } else if (!password) {
        alert('비밀번호를 입력해주세요.');
        inputPasswordRef.current?.focus();
      } else {
        const { data } = await login(body);
        setUser({
          accessToken: data.accessToken,
          name: data.name,
          email: data.email,
          nickname: data.nickname,
          userId: data.userId,
          profileImage: data.profileImage,
          statusCode: data.statusCode,
          userCode: data.userCode,
        });
        setMembersStatus({ ...membersStatus, [data.email]: data.statusCode });
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log('hello');
    if (event.code === 'Enter') {
      handleLogin();
    }
  };

  return (
    <Container>
      <SignUpBox>
        {/* <Link to="/enterprisetest">for enterprise</Link> */}
      </SignUpBox>
      <TextBox>
        <Text size={36} weight={'bold'}>
          로그인
        </Text>
        {serverName && isEnterprise && `for ${serverName}`}
      </TextBox>
      <InputArea>
        <InputBox
          label="이메일"
          placeholder="이메일을 입력해주세요."
          ref={inputEmailRef}
        />
        <InputBox
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          type="password"
          onKeyPress={onKeyPress}
          ref={inputPasswordRef}
        />
      </InputArea>
      <Button width="350" text="로그인" onClick={handleLogin} />
      <SignUpBox>
        <Text size={12} color={'gray400'}>
          TOOLIV이 처음이신가요?
        </Text>
        <Text
          size={12}
          onClick={() => {
            navigate('/join');
          }}
        >
          회원가입
        </Text>
      </SignUpBox>
      {isElectron() && (
        <SignUpBox>
          <Text size={12} color={'gray400'}>
            기업용으로 로그인
          </Text>
          <Text
            size={12}
            onClick={() => {
              navigate('/enterprisetest');
            }}
          >
            서버 등록
          </Text>
        </SignUpBox>
      )}
    </Container>
  );
};

export default LoginForm;
