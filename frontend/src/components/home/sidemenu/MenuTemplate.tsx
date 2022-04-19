import styled from "@emotion/styled";
import { SideMenuProps } from "../../../types/sidemenu";

const Container = styled.div`
  font-weight: 600;
  font-size: 16px;
`;

const MenuTemplate = ({ title, ...props }: SideMenuProps) => {
  return <Container>{title}</Container>;
};

export default MenuTemplate;
