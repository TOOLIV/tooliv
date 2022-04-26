import styled from '@emotion/styled';
import { colors } from '../../shared/color';
import { colorsTypes } from '../../types/common/colorsTypes';
import { textType } from '../../types/common/textTypes';

const Container = styled.p<{
  size: number;
  weight: string;
  color?: colorsTypes['color'];
  onClick?: () => void;
}>`
  font-size: ${(props) => props.size}px;
  font-weight: ${(props) => (props.weight === 'medium' ? 600 : 700)};
  color: ${(props) =>
    props.color ? colors[props.color] : props.theme.textColor};
  cursor: ${(props) => (props.onClick ? 'pointer' : 'default')};
`;

const Text = ({
  children,
  size,
  color,
  weight = 'medium',
  onClick,
}: textType) => {
  return (
    <Container size={size} weight={weight} color={color} onClick={onClick}>
      {children}
    </Container>
  );
};

export default Text;
