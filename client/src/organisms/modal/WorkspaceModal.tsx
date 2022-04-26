import styled from '@emotion/styled';
import Button from 'atoms/common/Button';
import Text from 'atoms/text/Text';
import InputBox from 'molecules/inputBox/InputBox';
import FileUploader from 'molecules/uploader/FileUploader';
import React, { useRef, useState } from 'react';
import { colors } from 'shared/color';

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
  const [imgFile, setImgFile] = useState('');
  const inputWorkspaceRef = useRef<HTMLInputElement>(null);

  const handleSetImg = (img: string) => {
    setImgFile(img);
  };
  return (
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
        <Button width="125" height="35" text="생성" />
      </ButtonBox>
    </Container>
  );
};

export default WorkspaceModal;
