import styled from '@emotion/styled';
import { textType } from '../../types/common/textTypes';

const Container = styled.p<{
  size: number;
  weight: string;
}>`
  font-size: ${(props) => props.size}px;
  font-weight: ${(props) => (props.weight === 'medium' ? 600 : 700)};
  color: ${(props) => props.theme.textColor};
`;

const Text = ({ children, size, weight = 'medium' }: textType) => {
  return (
    <Container size={size} weight={weight}>
      {children}
    </Container>
  );
};

export default Text;
