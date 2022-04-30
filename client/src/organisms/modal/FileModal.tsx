import styled from '@emotion/styled';
import DragDrop from 'organisms/chat/DragDrop';
import React, { useCallback } from 'react';
import { colors } from 'shared/color';
import { ButtonBox, Title } from './sidemenu/WorkspaceModal';
import Text from 'atoms/text/Text';
import { useRecoilState } from 'recoil';
import { FileTypes } from 'types/common/fileTypes';
import { chatFiles } from 'recoil/atom';
import Button from 'atoms/common/Button';
import { fileModalType } from 'types/channel/fileModalType';

const Modal = styled.div`
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 280px;
  height: 240px;
  margin: 30px auto;
  border: 5px dashed ${colors['gray200']};
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  line-height: 1.2;
  text-align: center;
  position: relative;
`;

const Wrapper = styled.div`
  width: 430px;
  padding: 25px;
  background-color: ${colors.white};
  border-radius: 30px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FilesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  margin-bottom: 25px;
`;

const FileContainer = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-around;
  border: 1px solid ${colors.gray200};
  border-radius: 10px;
  padding: 16px;
  margin: 12px;
`;
const FileModal = ({ onClick }: fileModalType) => {
  const [files, setFiles] = useRecoilState<FileTypes[]>(chatFiles);
  const handleFilterFile = useCallback(
    (id: number): void => {
      setFiles(files.filter((file: FileTypes) => file.id !== id));
    },
    [files]
  );

  return (
    <Modal>
      <Wrapper>
        <Title>
          <Text size={18}>파일 첨부</Text>
        </Title>
        <Container>
          첨부하고 싶은 파일을 드래그하거나 <br />
          클릭하여 선택하세요.
          <DragDrop />
        </Container>
        <FilesContainer>
          {files.length > 0 &&
            files.map((file: FileTypes) => {
              const {
                id,
                object: { name },
              } = file;

              return (
                <FileContainer key={id}>
                  <div>{name}</div>
                  <div
                    className="DragDrop-Files-Filter"
                    onClick={() => handleFilterFile(id)}
                  >
                    X
                  </div>
                </FileContainer>
              );
            })}
        </FilesContainer>
        <ButtonBox>
          <Button
            width="125"
            height="35"
            text="취소"
            bgColor="gray300"
            onClick={() => {
              setFiles([]);
              onClick();
            }}
          />
          <Button width="125" height="35" text="생성" onClick={onClick} />
        </ButtonBox>
      </Wrapper>
    </Modal>
  );
};

export default FileModal;
