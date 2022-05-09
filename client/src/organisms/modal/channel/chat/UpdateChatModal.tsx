import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Button from 'atoms/common/Button';
import React, { useState } from 'react';
import { workspaceModalType } from 'types/workspace/workspaceTypes';
import Text from 'atoms/text/Text';
import Editor, { EditorInput } from 'molecules/chat/Editor';
import { UpdateChatType } from 'types/channel/chatTypes';
import { useLocation } from 'react-router-dom';
import { updateChat, updateDM } from 'services/wsconnect';
import { useRecoilValue } from 'recoil';
import { user } from 'recoil/auth';

const Modal = styled.div<{ isOpen: boolean }>`
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(255, 255, 255, 0.7);

  ${(props) =>
    props.isOpen &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
    `}
`;

const Container = styled.div`
  width: 430px;
  padding: 25px 50px;
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 30px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.div`
  margin: 0 auto;
  margin-bottom: 16px;
`;
const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 32px auto 0;
`;

const UpdateChatModal = ({
  isOpen,
  onClose,
  contents,
  channelId,
  chatId,
  email,
}: UpdateChatType) => {
  const location = useLocation();
  const { accessToken } = useRecoilValue(user);
  const [message, setMessage] = useState<string>(contents);
  console.log(contents);
  const updateMessage = () => {
    console.log(document.getElementById('edit'));
    // if (location.pathname.includes('/direct')) {
    //   updateDM({ accessToken, channelId, chatId, email, message: contents });
    // } else {
    //   updateChat({ accessToken, channelId, chatId, email, message: contents });
    // }
    // onClose();
  };

  const handleMessage = (e: any) => {
    console.log(e);
  };
  return (
    <Modal isOpen={isOpen}>
      <Container>
        <Title>
          <Text size={18}>메시지 수정</Text>
        </Title>

        {/* <EditorInput value={contents} /> */}
        <div
          id="edit"
          contentEditable="true"
          suppressContentEditableWarning={true}
          dangerouslySetInnerHTML={{ __html: contents }}
          //   onChange={handleMessage}
        >
          {/* {contents} */}
        </div>
        <ButtonBox>
          <Button
            width="160"
            height="35"
            text="취소"
            bgColor="gray300"
            onClick={onClose}
          />
          <Button width="160" height="35" text="생성" onClick={updateMessage} />
        </ButtonBox>
      </Container>
    </Modal>
  );
};

export default UpdateChatModal;
