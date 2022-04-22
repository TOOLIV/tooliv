import styled from "@emotion/styled";
import React from "react";
import { sideMenuType } from "../../types/sidemenu/sideMenuType";

const Container = styled.div`
  /* display: flex;
  align-items: center; */
  font-size: 12px;
  font-weight: 500;
`;
const Label = ({ id, name }: sideMenuType) => {
  return <Container>{name}</Container>;
};

export default Label;
