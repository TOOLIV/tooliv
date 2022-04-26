import styled from '@emotion/styled';
import { createWorkspace } from 'api/workspaceApi';
import Button from 'atoms/common/Button';
import Text from 'atoms/text/Text';
import InputBox from 'molecules/inputBox/InputBox';
import FileUploader from 'molecules/uploader/FileUploader';
import React, { useRef, useState } from 'react';
import { colors } from 'shared/color';

const Modal = styled.div`
  display: none;
  position: fixed;
  top: 20%;
  right: 0;
  bottom: 0;
  left: 30%;
  z-index: 99;
  background-color: transparent;
`;

const Container = styled.div`
  width: 430px;
  padding: 25px;
  background-color: ${colors.white};
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
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: 0 auto;
`;

const WorkspaceModal = () => {
  const [file, setFile] = useState<File>();
  const inputWorkspaceRef = useRef<HTMLInputElement>(null);

  const handleSetImg = (file: FileList) => {
    setFile(file[0]);
  };

  const registWorkspace = async () => {
    const formData = new FormData();
    const name = inputWorkspaceRef.current?.value!;

    formData.append('multipartFile', file!);
    formData.append(
      'registerWorkspaceRequestDTO',
      new Blob(
        [
          JSON.stringify({
            name,
          }),
        ],
        {
          type: 'application/json',
        }
      )
    );
    try {
      if (!file) {
        alert('이미지를 등록해주세요.');
      }
      if (!name) {
        alert('워크스페이스명을 입력해주세요.');
        inputWorkspaceRef.current?.focus();
      }

      if (file && name) {
        const response = await createWorkspace(formData);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal>
      <Container>
        <Title>
          <Text size={18}>워크스페이스 생성</Text>
        </Title>
        <InputBox
          label="워크스페이스명"
          placeholder="워크스페이스명을 입력해주세요."
          ref={inputWorkspaceRef}
        />
        <FileUploader onChange={handleSetImg} />
        <ButtonBox>
          <Button width="125" height="35" text="취소" bgColor="gray300" />
          <Button
            width="125"
            height="35"
            text="생성"
            onClick={registWorkspace}
          />
        </ButtonBox>
      </Container>
    </Modal>
  );
};

export default WorkspaceModal;
