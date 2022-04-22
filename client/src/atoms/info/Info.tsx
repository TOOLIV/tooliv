import styled from '@emotion/styled';
import React from 'react';
import { infoTypes } from '../../types/common/infoTypes';
import { Label } from '../input/Input';

const Text = styled.p`
  font-size: 18px;
`;
const Info = ({ label, value }: infoTypes) => {
  return (
    <>
      <Label htmlFor="input">{label}</Label>
      <Text>{value}</Text>
    </>
  );
};

export default Info;
