import styled from '@emotion/styled';
import React from 'react';
import Icons from '../../atoms/common/Icons';
import { colors } from '../../shared/color';
import { chatButtonPropsTypes } from '../../types/meeting/chatTypes';
import { IconContainer } from './FunctionButton';

const ChatButton = ({ onClick }: chatButtonPropsTypes) => {
  return (
    <IconContainer message onClick={onClick}>
      <Icons icon="message" large />
    </IconContainer>
  );
};

export default ChatButton;
