import styled from '@emotion/styled';
import AutoDragDrop from 'organisms/chat/AutoDragDrop';
import React, { useCallback } from 'react';
import { colors } from 'shared/color';
import { ButtonBox, Title } from './sidemenu/WorkspaceModal';
import Text from 'atoms/text/Text';
import { useRecoilState } from 'recoil';
import { FileTypes } from 'types/common/fileTypes';
import { autoChatFiles, chatFiles } from 'recoil/atom';
import Button from 'atoms/common/Button';
import { fileModalType } from 'types/channel/fileModalType';
import AutoFileItem from 'molecules/modal/AutoFileItem';

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
  border: 5px dashed ${colors['gray200']};
  font-size: 14px;
  color: ${colors.gray600};
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
  padding: 20px;
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 30px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.06);
  display: flex;
  gap: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FilesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 280px;
  gap: 4px;
`;

const BlackContainer = styled.div`
  font-size: 12px;
  color: ${colors.gray400};
  text-align: center;
`;

const AutoChatFileModal = ({ onClick }: fileModalType) => {
  const [files, setFiles] = useRecoilState<FileTypes[]>(autoChatFiles);
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
          <AutoDragDrop />
        </Container>
        <FilesContainer>
          {files.length > 0 ? (
            files.map((file: FileTypes) => (
              <AutoFileItem file={file} key={file.id} />
            ))
          ) : (
            <BlackContainer>선택된 파일이 없습니다.</BlackContainer>
          )}
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

export default AutoChatFileModal;
