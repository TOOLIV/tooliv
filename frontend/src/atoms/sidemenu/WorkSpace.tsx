import styled from "@emotion/styled";
import { sideMenuType } from "../../types/sidemenu/sideMenuType";

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

const WorkSpace = ({ id, name }: sideMenuType) => {
  return (
    <Container isSelected={true}>
      {name.slice(0, 2)} <br /> {name.slice(3, 5)}
    </Container>
  );
};

export default WorkSpace;
