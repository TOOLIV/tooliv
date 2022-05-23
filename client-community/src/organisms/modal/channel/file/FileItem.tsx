import styled from '@emotion/styled';
import Time from 'atoms/chat/Time';
import Icons from 'atoms/common/Icons';
import React from 'react';
import { DefaultExtensionType, defaultStyles, FileIcon } from 'react-file-icon';
import { colors } from 'shared/color';
import { FileDTO } from 'types/common/fileTypes';

const FileContainer = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid ${colors.gray200};
  align-items: center;
  .icon {
    width: 30px;
  }
  .desc {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: calc(100% - 58px);
    font-size: 11px;
    height: 28px;
    color: ${(props) => props.theme.textColor};
    .name {
      white-space: nowrap;
      overflow: hidden;
      display: -webkit-box;
      text-overflow: ellipsis;
    }
    .info {
      color: ${colors.gray400};
    }
  }
  .download {
    :hover {
      background-color: ${(props) => props.theme.downloadHoverColor};
    }
  }
`;

type FileItemPropType = {
  file: FileDTO;
};

const FileItem = ({ file }: FileItemPropType) => {
  const extension = file.fileName
    .split('.')
    [file.fileName.split('.').length - 1].toLowerCase() as DefaultExtensionType;
  console.log(extension);
  return (
    <FileContainer>
      <div className="icon">
        <FileIcon extension={extension} {...defaultStyles[extension]} />
      </div>
      <div className="desc">
        <div className="name">{file.fileName}</div>
        <div className="info">
          {file.sender} · {file.sendTime.slice(0, 4)}-
          {file.sendTime.slice(5, 7)}- {file.sendTime.slice(8, 10)}{' '}
          {file.sendTime.slice(11, 13)}:{file.sendTime.slice(14, 16)}
        </div>
      </div>
      <div className="download">
        <Icons icon="download" width="28px" height="28px" onClick={() => {}} />
      </div>
    </FileContainer>
  );
};

export default FileItem;
