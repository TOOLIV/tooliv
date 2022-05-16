import styled from '@emotion/styled';
import React, { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { chatFiles } from 'recoil/atom';
import { colors } from 'shared/color';
import { FileTypes } from 'types/common/fileTypes';

const FilesContainer = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: center; */
  width: 100%;
  font-size: 14px;
  /* margin-left: 12px; */
`;

const FileContainer = styled.div`
  display: flex;
  width: 240px;
  justify-content: space-around;
  border: 1px solid ${colors.gray200};
  border-radius: 10px;
  padding: 16px;
  margin: 12px 12px 12px 0;
`;

const Files = () => {
  const [files, setFiles] = useRecoilState<FileTypes[]>(chatFiles);
  const handleFilterFile = useCallback(
    (id: number): void => {
      setFiles(files.filter((file: FileTypes) => file.id !== id));
    },
    [files]
  );
  return (
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
  );
};

export default Files;
