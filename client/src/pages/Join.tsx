import styled from '@emotion/styled';
import JoinForm from '../organisms/join/JoinForm';
import { colors } from '../shared/color';
import bgImage from '../assets/img/wavy.svg';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.lightPrimary};
  height: 100vh;
  background-image: url(${bgImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 70px;
`;
const Join = () => {
  return (
    <Container>
      <JoinForm />
    </Container>
  );
};

export default Join;
