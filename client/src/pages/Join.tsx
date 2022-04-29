import styled from '@emotion/styled';
import JoinForm from '../organisms/join/JoinForm';
import { colors } from '../shared/color';

const WaveContainer = styled.div`
  display: inline-block;
  position: absolute;
  width: 100%;
  padding-bottom: 100%;
  vertical-align: middle;
  overflow: hidden;
  bottom: 0;
  transform: scale(-1, 1);
  transform-origin: center;
  svg {
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.lightPrimary};
  height: 100vh;
`;
const Join = () => {
  return (
    <Container>
      <JoinForm />
      {/* <WaveContainer>
        <svg viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet">
          <path
            d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"
            fill="red"
          ></path>
        </svg>
      </WaveContainer> */}
    </Container>
  );
};

export default Join;
