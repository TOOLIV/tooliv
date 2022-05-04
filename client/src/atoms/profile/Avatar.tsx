import styled from '@emotion/styled';
import React from 'react';
import { avatarTypes } from '../../types/common/avatarTypes';
import avatar from '../../assets/img/avatar.png';
import { ReactComponent as AvatarIcon } from '../../assets/img/user.svg';
import { colors } from 'shared/color';
const Image = styled.img<{ size?: string }>`
  width: ${(props) => (props.size ? `${props.size}px` : '20px')};
  height: ${(props) => (props.size ? `${props.size}px` : '20px')};
`;

const Avatar = ({ src, size = '20' }: avatarTypes) => {
  console.log(src);
  return src ? (
    <Image src={src ? src : avatar} size={size} />
  ) : (
    <AvatarIcon width={size} height={size} fill={colors.gray500} />
  );
};

export default Avatar;
