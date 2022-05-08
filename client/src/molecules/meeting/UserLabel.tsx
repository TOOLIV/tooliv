import styled from '@emotion/styled';
import React from 'react';
import { colors } from 'shared/color';
import { userLabelPropsType } from 'types/meeting/openviduTypes';

const LabelContainer = styled.div`
  position: absolute;
  z-index: 1;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%, 0);
  color: ${colors.white};
  background-color: ${colors.black + 'aa'};
  font-size: 8px;
  font-weight: 700;
  padding: 5px 10px;
  border-radius: 45px;
`;

const UserLabel = ({ userName }: userLabelPropsType) => {
  return <LabelContainer>{userName}</LabelContainer>;
};

export default UserLabel;
