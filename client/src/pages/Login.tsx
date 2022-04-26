import styled from '@emotion/styled';
import LoginForm from '../organisms/login/LoginForm';
import LoginLogo from '../organisms/login/LoginLogo';
import { ReactComponent as LoginImg } from '../assets/img/loginImg.svg';

import { colors } from '../shared/color';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.lightPrimary};
  height: 100vh;
`;
const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 115px;
  margin-right: 30px;
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
