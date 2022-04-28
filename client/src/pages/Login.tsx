import styled from '@emotion/styled';
import LoginForm from '../organisms/login/LoginForm';
import LoginLogo from '../organisms/login/LoginLogo';
import { ReactComponent as LoginImg } from '../assets/img/loginImg.svg';
import bgImage from '../assets/img/wavy.svg';

import { colors } from '../shared/color';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${bgImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 70px;

  background-color: ${colors.lightPrimary};
  height: 100vh;
`;
const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 90px;
`;

const Login = () => {
  return (
    <Container>
      <LogoContainer>
        <LoginLogo />
        <LoginImg />
      </LogoContainer>
      <LoginForm />
    </Container>
  );
};

export default Login;
