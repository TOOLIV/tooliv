import styled from '@emotion/styled';
import { labelType } from '../../types/common/labelType';

const Container = styled.div<{ size?: string }>`
  font-size: ${(props) => (props.size ? props.size : '12px')};
  font-weight: 500;
  color: ${(props) => props.theme.textColor};
`;
const Label = ({ id, name, size }: labelType) => {
  return <Container size={size}>{name}</Container>;
};

export default Label;
