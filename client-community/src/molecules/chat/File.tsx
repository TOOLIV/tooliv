import styled from '@emotion/styled';
import React from 'react';
import { colors } from 'shared/color';
import {
  FileIcon,
  defaultStyles,
  FileIconProps,
  DefaultExtensionType,
} from 'react-file-icon';

const Container = styled.div`
  display: flex;
  width: auto;
  max-width: 285px;
  border: 1px solid ${colors.gray200};
  border-radius: 10px;
  padding: 12px;
  transition: 0.3s;
  font-size: 14px;
  gap: 10px;
  align-items: center;
  &:hover {
    cursor: pointer;
    background-color: ${colors.gray100};
  }
  .icon {
    width: 30px;
  }
  .name {
    max-width: 180px;
    font-size: 12px;
    line-height: normal;
    word-break: break-all;
  }
`;

type fileType = {
  name: string;
  url: string;
};
const File = ({ name, url }: fileType) => {
  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    // e.preventDefault();
    window.open(url);
  };
  const extension = name
    .split('.')
    [name.split('.').length - 1].toLowerCase() as DefaultExtensionType;

  return (
    <Container onClick={onClick}>
      <div className="icon">
        <FileIcon extension={extension} {...defaultStyles[extension]} />
      </div>
      <div className="name">{name}</div>
    </Container>
  );
};
export default File;
