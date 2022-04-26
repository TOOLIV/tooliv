import styled from '@emotion/styled';
import { labelType } from '../../types/common/labelType';

const Container = styled.div<{ isSelected: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background-color: #ffffff;
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  margin-right: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${(props) =>
    props.isSelected && `1px solid ${props.theme.pointColor}`};
`;

const WorkSpace = ({ id, name }: labelType) => {
  return (
    <Container isSelected={true}>
      {name.slice(0, 2)} <br /> {name.slice(3, 5)}
    </Container>
  );
};

export default WorkSpace;
