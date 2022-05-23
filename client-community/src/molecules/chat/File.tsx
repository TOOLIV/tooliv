import styled from '@emotion/styled';
import React from 'react';
import { colors } from 'shared/color';
import {
  FileIcon,
  defaultStyles,
  FileIconProps,
  DefaultExtensionType,
} from 'react-file-icon';
import Icons from 'atoms/common/Icons';

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
    cursor: default;
  }
  .icon {
    width: 27px;
  }
  .name {
    max-width: 180px;
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
  .download {
    border-radius: 5px;
    :hover {
      cursor: pointer;
      background-color: ${(props) => props.theme.downloadHoverColor};
    }
  }
`;

type fileType = {
  name: string;
  url: string;
};
const File = ({ name, url }: fileType) => {
  const onClick = () => {
    // e.preventDefault();
    window.open(url);
  };
  const extension = name
    .split('.')
    [name.split('.').length - 1].toLowerCase() as DefaultExtensionType;

  return (
    <Container>
      <div className="icon">
        <FileIcon extension={extension} {...defaultStyles[extension]} />
      </div>
      <div className="name">{name}</div>
      <div className="download">
        <Icons icon="download" width="24px" height="24px" onClick={onClick} />
      </div>
    </Container>
  );
};
export default File;
