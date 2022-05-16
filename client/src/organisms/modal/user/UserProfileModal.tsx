import styled from '@emotion/styled';
import React from 'react';

const Container = styled.div`
  width: 300px;
  height: 400px;
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 8px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const UserProfileModal = () => {
  return <Container>hi</Container>;
};

export default UserProfileModal;
