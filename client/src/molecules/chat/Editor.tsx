import styled from "@emotion/styled";
import React from "react";

import Button from "../../atoms/common/Button";
import { colors } from "../../shared/color";
import { editorProps } from "../../types/common/buttonTypes";

const Container = styled.div`
  width: 100%;
  border-radius: 10px;
  border: 1px solid ${colors.gray200};
  height: 64px;
  position: relative;
`;
const InputContainer = styled.input`
  width: 85%;
  margin: 12px;
  height: 50%;
  border: 0;
`;
const Wrapper = styled.div`
  position: absolute;
  right: 16px;
  top: 12px;
`;
const Editor = ({ onClick }: editorProps) => {
  return (
    <Container>
      <InputContainer></InputContainer>
      <Wrapper>
        <Button onClick={onClick} width="50px" height="40px" text="전송" />
      </Wrapper>
    </Container>
  );
};

export default Editor;
