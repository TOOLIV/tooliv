import styled from '@emotion/styled';
import React from 'react';
import { colors } from '../../shared/color';
import { userBadgeTypes } from '../../types/common/userTypes';
import Icons from '../common/Icons';

const UserBadge = ({ name, email, onClick }: userBadgeTypes) => {
  const Container = styled.div`
    display: flex;
    border-radius: 45px;
    border: 1px solid ${colors.primary};
    padding: 8px 16px;
  `;

  const TextBox = styled.div`
    display: flex;
    margin-right: 12px;
    align-items: center;
  `;

  const Text = styled.p`
    font-size: 12px;
    /* height: fit-content; */
  `;

  const Button = styled.button`
    padding: 0;
    height: 20px;
    background: none;
    border: none;
    cursor: pointer;
  `;

  return (
    <Container>
      <TextBox>
        <Text>{name}</Text>
        <Text>({email})</Text>
      </TextBox>
      <Button onClick={onClick}>
        <Icons icon="xMark" color="primary" />
      </Button>
    </Container>
  );
};

export default UserBadge;
