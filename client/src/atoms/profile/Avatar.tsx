import styled from '@emotion/styled';
import React from 'react';
import { avatarTypes } from '../../types/common/avatarTypes';
import avatar from '../../assets/img/avatar.png';
const Image = styled.img<{ size?: string }>`
  width: ${(props) => (props.size ? `${props.size}px` : '20px')};
  height: ${(props) => (props.size ? `${props.size}px` : '20px')};
`;

const Avatar = ({ src, size }: avatarTypes) => {
  return <Image src={src ? src : avatar} size={size} />;
};

export default Avatar;
