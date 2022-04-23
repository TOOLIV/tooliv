import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';
import { findUser } from '../../../api/userApi';
import InputBox from '../../../molecules/inputBox/InputBox';
import UserItem from '../../../molecules/userItem/UserItem';
import { userListTypes } from '../../../types/common/userTypes';

const UserBox = styled.div`
  height: 50vh;
`;
const FindUserSection = () => {
  const [userList, setUserList] = useState([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = () => {
    console.log(inputRef.current?.value);
    const keyword = inputRef.current?.value!;
    userListApi(keyword);
  };

  const userListApi = async (keyword: string) => {
    const response = await findUser(keyword);
    const data = response.data.userInfoResponseDTOList;
    if (data) {
      setUserList(data);
    }
    console.log(data);
  };

  useEffect(() => {}, [userList]);
  const onClick = () => {
    console.log('hello');
  };
  return (
    <>
      <InputBox
        label="이메일"
        placeholder="회원아이디나 이름을 입력해주세요."
        ref={inputRef}
        onChange={onChange}
      />
      <UserBox>
        {userList.map((user: userListTypes) => (
          <UserItem
            name={user.name}
            email={user.email}
            userCode={user.userCode}
            onClick={onClick}
          />
        ))}
      </UserBox>
      {/* <UserItem
          name="송민수"
          email="thdalstn6352@naver.com"
          userCode="USER"
          selected={selectedOption}
          onChange={setSelectedOption}
          onClick={onClick}
        /> */}
    </>
  );
};

export default FindUserSection;
