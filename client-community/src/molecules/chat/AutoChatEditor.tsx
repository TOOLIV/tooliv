import styled from '@emotion/styled';
import Icons from 'atoms/common/Icons';
import AutoChatFileModal from 'organisms/modal/AutoChatFileModal';
import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Button from '../../atoms/common/Button';
import { autoChatMessage, channelMessage, isOpenChat } from '../../recoil/atom';
import { editorProps } from '../../types/common/buttonTypes';

const Container = styled.div`
  width: 100%;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.borderColor};
  display: flex;
  justify-content: space-between;
  min-height: 64px;
  padding-right: 10px;
`;
export const EditorInput = styled.textarea<{ isChatOpen: boolean }>`
  min-height: 50%;
  width: 100%;
  padding: 10px;
  border: 0;
  resize: none;
  color: ${(props) => props.theme.textColor};
  font-size: 16px;
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 10px;
  border: ${(props) =>
    props.isChatOpen && '1px solid ' + props.theme.hoverColor};
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
  gap: 16px;
`;

const AutoChatEditor = ({ onClick, sendMessage, isButton }: editorProps) => {
  const [message, setMessage] = useRecoilState<string>(autoChatMessage);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const isChatOpen = useRecoilValue(isOpenChat);

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
          isChatOpen={isChatOpen}
        ></EditorInput>
        <Wrapper>
          <Icons
            icon="file"
            color="gray500"
            onClick={handleFileModal}
            width="24"
            height="24"
          />
          {isButton && (
            <Button onClick={onClick} width="50" height="40" text="전송" />
          )}
        </Wrapper>
      </Container>
      {isModalOpen && <AutoChatFileModal onClick={handleFileModal} />}
    </>
  );
};

export default AutoChatEditor;
