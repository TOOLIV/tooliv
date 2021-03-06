import styled from '@emotion/styled';
import Icons from 'atoms/common/Icons';
import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { DefaultExtensionType, defaultStyles, FileIcon } from 'react-file-icon';
import { useRecoilState } from 'recoil';
import { chatFiles } from 'recoil/atom';
import { colors } from 'shared/color';
import { FileTypes } from 'types/common/fileTypes';

const FileContainer = styled.div`
  width: 280px;
  font-size: 12px;
  display: flex;
  border: 1px solid ${colors.gray200};
  border-radius: 10px;
  padding: 8px;
  align-items: center;
  gap: 8px;

  .name {
    width: 202px;
    font-size: 12px;
    line-height: normal;
    /* white-space: nowrap; */
    word-break: break-all;
    height: 32px;
    overflow: hidden;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .icon {
    width: 20px;
  }
`;

type fileItemPropsType = {
  file: FileTypes;
};

const FileItem = ({ file }: fileItemPropsType) => {
  const [files, setFiles] = useRecoilState<FileTypes[]>(chatFiles);
  const handleFilterFile = useCallback(
    (id: number): void => {
      setFiles(files.filter((file: FileTypes) => file.id !== id));
    },
    [files]
  );
  const extension = file.object.name
    .split('.')
    [
      file.object.name.split('.').length - 1
    ].toLowerCase() as DefaultExtensionType;

  return (
    <FileContainer>
      <div className="icon">
        <FileIcon extension={extension} {...defaultStyles[extension]} />
      </div>
      <div className="name">{file.object.name}</div>
      <Icons
        icon="xMark"
        width="24px"
        height="24px"
        onClick={() => handleFilterFile(file.id)}
      />
    </FileContainer>
  );
};

export default FileItem;
