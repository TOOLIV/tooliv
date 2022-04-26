import styled from '@emotion/styled';
import Logo from '../../atoms/common/Logo';
import Text from '../../atoms/text/Text';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const LoginLogo = () => {
  return (
    <Container>
      <Logo width="150" height="150" />
      <Text size={50} weight={'700'}>
        TOOLIV
      </Text>
    </Container>
  );
};

export default LoginLogo;
