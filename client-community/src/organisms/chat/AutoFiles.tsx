import styled from '@emotion/styled';
import FileItem from 'molecules/chat/FileItem';
import AutoFileItem from 'molecules/modal/AutoFileItem';
import React, { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { autoChatFiles, chatFiles } from 'recoil/atom';
import { colors } from 'shared/color';
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

const AutoFiles = () => {
  const [files, setFiles] = useRecoilState<FileTypes[]>(autoChatFiles);
  const handleFilterFile = useCallback(
    (id: number): void => {
      setFiles(files.filter((file: FileTypes) => file.id !== id));
    },
    [files]
  );
  return (
    <FilesContainer>
      {files.length > 0 &&
        files.map((file: FileTypes) => (
          <AutoFileItem key={file.id} file={file} />
        ))}
    </FilesContainer>
  );
};

export default AutoFiles;
