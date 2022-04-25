import styled from '@emotion/styled';
import React from 'react';
import { colors } from '../../shared/color';
import { userBadgeTypes } from '../../types/common/userTypes';
import Icons from '../../atoms/common/Icons';
import Text from '../../atoms/text/Text';

const Container = styled.div`
  display: flex;
  width: fit-content;
  border-radius: 45px;
  border: 1px solid ${colors.primary};
  padding: 8px 16px;
`;

const TextBox = styled.div`
  display: flex;
  margin-right: 12px;
  align-items: center;
`;

const IconButton = styled.div`
  cursor: pointer;
  height: 16px;
`;

const UserBadge = ({ name, email, onClick }: userBadgeTypes) => {
  const emailForm = `(${email})`;
  const handleDelete = () => {
    onClick(email);
  };
  return (
    <Container>
      <TextBox>
        <Text size={12}>{name}</Text>
        <Text size={12}>{emailForm}</Text>
      </TextBox>
      <IconButton>
        <Icons icon="xMark" color="primary" onClick={handleDelete} />
      </IconButton>
    </Container>
  );
};

export default UserBadge;
