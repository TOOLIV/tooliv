import styled from '@emotion/styled';
import LoginForm from '../organisms/login/LoginForm';
import LoginLogo from '../organisms/login/LoginLogo';
import { ReactComponent as LoginImg } from '../assets/img/loginImg.svg';
import bgImage from '../assets/img/wavy.svg';
import bgImageDark from '../assets/img/wavy_dark.svg';

import { appThemeMode } from 'recoil/atom';
import { useRecoilValue } from 'recoil';

const Container = styled.div<{ mode: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: ${(props) =>
    props.mode === 'light' ? `url(${bgImage})` : `url(${bgImageDark})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 70px;

  background-color: ${(props) => props.theme.loginBgColor};
  height: 100vh;
`;
const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 90px;
`;

const Login = () => {
  const mode = useRecoilValue(appThemeMode);
  return (
    <Container mode={mode}>
      <LogoContainer>
        <LoginLogo />
        <LoginImg />
      </LogoContainer>
      <LoginForm />
    </Container>
  );
};

export default Login;
