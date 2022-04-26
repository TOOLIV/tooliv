import styled from '@emotion/styled';
import Text from 'atoms/text/Text';
import { useState } from 'react';
import { workspaceType } from 'types/workspace/workspaceTypes';

const Container = styled.div<{
  isSelected: boolean;
  thumbnail: string;
  ['data-name']: string;
}>`
  width: 40px;
  height: 40px;
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

const WorkSpace = ({ name, thumbnailImage }: workspaceType) => {
  const [isSelected, setIsSelected] = useState(true);

  return (
    <Container
      isSelected={isSelected}
      thumbnail={thumbnailImage}
      data-name={name}
    >
      {thumbnailImage ? null : <Text size={12}>{name}</Text>}
    </Container>
  );
};

export default WorkSpace;
