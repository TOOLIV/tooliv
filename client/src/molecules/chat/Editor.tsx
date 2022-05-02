import styled from '@emotion/styled';
import Icons from 'atoms/common/Icons';
import FileModal from 'organisms/modal/FileModal';
import React, { useState } from 'react';
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
  display: flex;
  position: absolute;
  right: 16px;
  top: 12px;
  justify-content: center;
  align-items: center;
`;

const Editor = ({ onClick, sendMessage }: editorProps) => {
  const [message, setMessage] = useRecoilState<string>(channelMessage);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setMessage(value);
  };

  const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(event);
    if (event.code === 'Enter') {
      if (sendMessage) {
        sendMessage();
      }
    }
  };

  const handleFileModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  return (
    <>
      <Container>
        {/* <DragDrop /> */}
        <Input
          type="textarea"
          value={message}
          onChange={onChange}
          onKeyPress={onKeyUp}
        ></Input>
        <Wrapper>
          <Icons icon="file" color="gray500" onClick={handleFileModal} />
          <Button onClick={onClick} width="50" height="40" text="전송" />
        </Wrapper>
      </Container>
      {isModalOpen && <FileModal onClick={handleFileModal} />}
    </>
  );
};

export default Editor;
