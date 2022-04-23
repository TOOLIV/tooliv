import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';
import { changeCode, findUser } from '../../../api/userApi';
import InputBox from '../../../molecules/inputBox/InputBox';
import UserItem from '../../../molecules/userItem/UserItem';
import { userCodeTypes, userListTypes } from '../../../types/common/userTypes';

const UserBox = styled.div`
  height: 50vh;
`;
const FindUserSection = () => {
  const [userList, setUserList] = useState([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const searchUserList = () => {
    console.log(inputRef.current?.value);
    const keyword = inputRef.current?.value!;
    userListApi(keyword);
  };

  const changeUserCode = (value: string, email: string) => {
    const body = { userCode: value, email };
    userCodeApi(body);
  };

  const userListApi = async (keyword: string) => {
    const response = await findUser(keyword);
    const data = response.data.userInfoResponseDTOList;
    if (data) {
      setUserList(data);
    }
    console.log(data);
  };

  const userCodeApi = async (body: userCodeTypes) => {
    const response = await changeCode(body);
    console.log(response);
  };

  const onClick = () => {
    console.log('hello');
  };
  return (
    <>
      <InputBox
        label="이메일"
        placeholder="회원아이디나 이름을 입력해주세요."
        ref={inputRef}
        onChange={searchUserList}
      />
      <UserBox>
        {userList.map((user: userListTypes) => (
          <UserItem
            key={user.id}
            name={user.name}
            email={user.email}
            userCode={user.userCode}
            onClick={onClick}
            onChange={changeUserCode}
          />
        ))}
      </UserBox>
    </>
  );
};

export default FindUserSection;
