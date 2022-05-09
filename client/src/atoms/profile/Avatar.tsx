import styled from '@emotion/styled';
import React from 'react';
import { avatarTypes } from '../../types/common/avatarTypes';
import avatar from '../../assets/img/avatar.png';
import { ReactComponent as AvatarIcon } from '../../assets/img/user.svg';
import { colors } from 'shared/color';
const Image = styled.img<{ size?: string }>`
  border-radius: 50%;
  width: ${(props) => (props.size ? `${props.size}px` : '20px')};
  height: ${(props) => (props.size ? `${props.size}px` : '20px')};
`;

const Avatar = ({ src, size = '20' }: avatarTypes) => {
  return src ? (
    <Image src={src} size={size} alt="profile" />
  ) : (
    <AvatarIcon width={size} height={size} fill={colors.gray500} />
  );
};

export default Avatar;
