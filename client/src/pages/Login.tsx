import styled from '@emotion/styled';
import LoginForm from '../organisms/login/LoginForm';
import LoginLogo from '../organisms/login/LoginLogo';
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
  margin-right: 30px;
`;

const Login = () => {
  return (
    <Container>
      <LogoContainer>
        <LoginLogo />
      </LogoContainer>
      <LoginForm />
      {/* <LoginImg /> */}
    </Container>
  );
};

export default Login;
