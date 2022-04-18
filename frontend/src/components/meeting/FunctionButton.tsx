import styled from "@emotion/styled";
import React from "react";
import { icons } from "../../shared/icons";
import { functionButtonTypes } from "../../types/meeting/functionButtonTypes";
import { iconsTypes } from "../../types/common/iconsTypes";
import LargeIcons from "../common/LargeIcons";

const Container = styled.div<{ exit?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 45px;
  background-color: ${(props) => (props.exit ? "#FF7585" : "#c4c4c4")};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FunctionButton = ({ icon, exit }: functionButtonTypes) => {
  return (
    <Container exit={exit}>
      <LargeIcons icon={icon} />
    </Container>
  );
};

export default FunctionButton;
