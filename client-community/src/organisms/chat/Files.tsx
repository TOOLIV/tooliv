import styled from '@emotion/styled';
import FileItem from 'molecules/chat/FileItem';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { chatFiles } from 'recoil/atom';
import { FileTypes } from 'types/common/fileTypes';

const FilesContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  gap: 4px;
  overflow-x: auto;
  /* overflow-y: hidden; */
`;

const Files = () => {
  const files = useRecoilValue<FileTypes[]>(chatFiles);
  return (
    <FilesContainer>
      {files.length > 0 &&
        files.map((file: FileTypes) => <FileItem file={file} />)}
    </FilesContainer>
  );
};

export default Files;
