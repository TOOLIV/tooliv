import styled from "@emotion/styled";
import React from "react";
import { buttonTypes } from "../../types/common/buttonTypes";

const Container = styled.div<{ width?: string; height?: string }>`
  width: ${(props) => (props.width ? props.width : "182px")};
  height: ${(props) => (props.height ? props.height : "48px")};
  background-color: ${(props) => props.theme.pointColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 8px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = ({ width, height, text }: buttonTypes) => {
  return (
    <Container width={width} height={height}>
      {text}
    </Container>
  );
};

export default Button;
