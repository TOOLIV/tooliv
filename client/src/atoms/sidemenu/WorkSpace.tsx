import styled from '@emotion/styled';
import Text from 'atoms/text/Text';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { currentWorkspace, userLog } from 'recoil/atom';
import {
  workspaceListType,
  workspaceType,
} from 'types/workspace/workspaceTypes';

const Container = styled.div<{
  isSelected: boolean;
  thumbnail: string;
  ['data-name']: string;
}>`
  width: 40px;
  height: 40px;
  flex: 0 0 auto;
  border-radius: 10px;
  background-color: #ffffff;
  margin-right: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${(props) =>
    props.isSelected && `1px solid ${props.theme.pointColor}`};
  background-image: url(${(props) => props.thumbnail});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  cursor: pointer;
  &:hover {
    position: relative;
  }

  &:hover:after {
    top: 130%;
    left: 0;
    opacity: 1;
  }

  &:after {
    content: attr(data-name);
    transition: bottom 0.3s ease-in-out, opacity 0.3s ease-in-out;
    background-color: black;
    box-shadow: 0px 0px 3px 1px rgba(50, 50, 50, 0.4);
    border-radius: 5px;
    display: block;
    box-sizing: border-box;
    color: #ffffff;
    font-size: 12px;
    margin-bottom: 5px;
    padding: 7px 10px;
    position: absolute;
    width: max-content;
    max-width: 300px;
    /* word-wrap: break-word; */
    text-align: center;
    z-index: 9999;

    opacity: 0;
    left: -9999px;
    top: 90%;
  }
`;

const WorkSpace = ({
  id,
  name,
  thumbnailImage,
  onClick,
}: workspaceListType) => {
  const workspaceId = useRecoilValue(currentWorkspace);

  const handleClickWorkspace = () => {
    onClick(id);
  };

  return (
    <Container
      isSelected={id === workspaceId}
      thumbnail={thumbnailImage}
      data-name={name}
      onClick={handleClickWorkspace}
    >
      {thumbnailImage ? null : <Text size={12}>{name}</Text>}
    </Container>
  );
};

export default WorkSpace;
