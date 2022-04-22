import styled from '@emotion/styled';
import { colors } from '../../shared/color';
import { colorsTypes } from '../../types/common/colorsTypes';
import { textType } from '../../types/common/textTypes';

const Container = styled.p<{
  size: number;
  weight: string;
  color: colorsTypes['color'];
}>`
  font-size: ${(props) => props.size}px;
  font-weight: ${(props) => (props.weight === 'medium' ? 600 : 700)};
  color: ${(props) => colors[props.color]};
`;

const Text = ({
  children,
  size,
  color = 'black',
  weight = 'medium',
  onClick,
}: textType) => {
  return (
    <Container size={size} weight={weight} color={color}>
      {children}
    </Container>
  );
};

export default Text;
