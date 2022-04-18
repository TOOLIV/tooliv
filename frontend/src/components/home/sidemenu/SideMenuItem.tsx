import styled from "@emotion/styled";
import React from "react";
import { SideMenuItemProps } from "../../../types/sidemenu";

const Container = styled.div`
  width: 280px;
  height: 30px;
  display: flex;
  justify-content: end;
`;
const MenuBody = styled.div`
  padding: 0 0 0 10px;
  width: 256px;
  height: 30px;
  background-color: #FF9E89;
  border-radius: 10px 0 0 10px;
`;
const Tail = styled.div`
  height: 30px;
  width: 4px;
  background-color: #FF6C4B;
`;

const SideMenuItem = ({}: SideMenuItemProps) => {
  return (
    <Container>
      <MenuBody></MenuBody>
      <Tail />
    </Container>
  );
};

export default SideMenuItem;
