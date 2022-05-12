import styled from '@emotion/styled';
import Icons from 'atoms/common/Icons';
import FileModal from 'organisms/modal/FileModal';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import Button from '../../atoms/common/Button';
import { channelMessage } from '../../recoil/atom';
import { editorProps } from '../../types/common/buttonTypes';

const Container = styled.div`
  width: 100%;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.borderColor};
  display: flex;
  justify-content: space-between;
  min-height: 64px;
  padding: 0 10px;
`;
export const EditorInput = styled.textarea`
  width: 85%;
  margin: 12px;
  min-height: 50%;
  border: 0;
  resize: none;
  color: ${(props) => props.theme.textColor};
  font-size: 16px;
  background-color: ${(props) => props.theme.bgColor};
  &:focus {
    outline: none;
  }
`;
const Wrapper = styled.div`
  display: flex;
  /* position: absolute; */
  /* right: 16px; */
  /* top: 12px; */
  justify-content: center;
  align-items: center;
`;

const Editor = ({ onClick, sendMessage }: editorProps) => {
  const [message, setMessage] = useRecoilState<string>(channelMessage);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const onChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setMessage(value);
  };

  const onKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.code === 'Enter') {
      if (!event.shiftKey) {
        event.preventDefault();
        if (sendMessage) {
          sendMessage();
        }
      }
    }
  };

  const handleFileModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  return (
    <>
      <Container>
        <EditorInput
          value={message}
          onChange={onChange}
          onKeyPress={onKeyPress}
        ></EditorInput>
        <Wrapper>
          <Icons
            icon="file"
            color="gray500"
            onClick={handleFileModal}
            width="30"
            height="30"
          />
          <Button onClick={onClick} width="50" height="40" text="전송" />
        </Wrapper>
      </Container>
      {isModalOpen && <FileModal onClick={handleFileModal} />}
    </>
  );
};

export default Editor;
