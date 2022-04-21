import styled from "@emotion/styled";
import React from "react";
import { functionButtonTypes } from "../../types/meeting/functionButtonTypes";
import { colors } from "../../shared/color";
import { prependOnceListener } from "process";
import Icons from "../../atoms/common/Icons";

const Container = styled.div<{ exit?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 45px;
  background-color: ${(props) =>
    props.exit ? colors["secondary"] : colors["gray300"]};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  :hover {
    background-color: ${(props) =>
      props.exit ? "#EC6A6A" : colors["gray400"]};
  }
`;

const FunctionButton = ({ icon, exit }: functionButtonTypes) => {
  return (
    <Container exit={exit}>
      <Icons icon={icon} large color={exit ? "red700" : undefined} />
    </Container>
  );
};

export default FunctionButton;
