import styled from '@emotion/styled';
import React, { useState } from 'react';
import Dropdown from '../../atoms/dropdown/Dropdown';
import Avatar from '../../atoms/profile/Avatar';
import Text from '../../atoms/text/Text';
import { userItemTypes, userSelectorTypes } from '../../types/common/userTypes';

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 470px;
  padding: 8px 16px;
`;

const AvatarBox = styled.div`
  margin-right: 12px;
`;
const UserBox = styled.div`
  display: flex;
  align-items: center;
`;
const ControlBox = styled.div`
  display: flex;
  align-items: center;
`;
const DropdownBox = styled.div`
  margin-right: 20px;
`;
const ButtonBox = styled.div`
  cursor: pointer;
`;
const UserItem = ({
  name,
  email,
  userCode,
  onClick,
  onChange,
}: // onChange,
userItemTypes) => {
  const [selectedOption, setSelectedOption] = useState({
    value: 'Default',
    label: '일반',
  });

  const handleChangeUserCode = (data: userSelectorTypes) => {
    setSelectedOption(data);
    onChange(data.value, email);
  };

  const userInfo = `${name}(${email})`;
  const options = [
    { value: 'MANAGER', label: '관리자' },
    { value: 'USER', label: '일반' },
  ];
  const defaultValue = options.find((op) => op.value === userCode);
  return (
    <Item>
      <UserBox>
        <AvatarBox>
          <Avatar size="24" />
        </AvatarBox>
        <Text size={14}>{userInfo}</Text>
      </UserBox>
      <ControlBox>
        <DropdownBox>
          <Dropdown
            options={options}
            defaultValue={defaultValue!}
            // onChange={setSelectedOption}
            onChange={handleChangeUserCode}
            selected={selectedOption}
          />
        </DropdownBox>
        <ButtonBox onClick={onClick}>
          <Text size={12} color="gray500">
            삭제
          </Text>
        </ButtonBox>
      </ControlBox>
    </Item>
  );
};

export default UserItem;
