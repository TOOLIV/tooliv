import styled from '@emotion/styled';
import React from 'react';
import { useRecoilState } from 'recoil';

import Button from '../../atoms/common/Button';
import { channelMessage } from '../../recoil/atom';
import { colors } from '../../shared/color';
import { editorProps } from '../../types/common/buttonTypes';

const Container = styled.div`
  width: 100%;
  border-radius: 10px;
  border: 1px solid ${colors.gray200};
  height: 64px;
  position: relative;
`;
const Input = styled.input`
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
  const [message, setMessage] = useRecoilState<string>(channelMessage);
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setMessage(value);
  };
  return (
    <Container>
      <Input value={message} onChange={onChange}></Input>
      <Wrapper>
        <Button onClick={onClick} width="50" height="40" text="전송" />
      </Wrapper>
    </Container>
  );
};

export default Editor;
