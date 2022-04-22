import styled from '@emotion/styled';
import React, { useRef, useState } from 'react';
import { findUser } from '../../../api/userApi';
import InputBox from '../../../molecules/inputBox/InputBox';
import UserItem from '../../../molecules/userItem/UserItem';

const UserBox = styled.div`
  height: 50vh;
`;
const FindUserSection = () => {
  const [selectedOption, setSelectedOption] = useState({
    value: 'Default',
    label: '일반',
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = () => {
    console.log(inputRef.current?.value);
    const keyword = inputRef.current?.value!;
    userListApi(keyword);
  };

  const userListApi = async (keyword: string) => {
    await findUser(keyword);
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
        onChange={onChange}
      />
      <UserBox>
        <UserItem
          name="송민수"
          email="thdalstn6352@naver.com"
          userCode="USER"
          selected={selectedOption}
          onChange={setSelectedOption}
          onClick={onClick}
        />
        <UserItem
          name="송민수"
          email="thdalstn6352@naver.com"
          userCode="USER"
          selected={selectedOption}
          onChange={setSelectedOption}
          onClick={onClick}
        />
        <UserItem
          name="송민수"
          email="thdalstn6352@naver.com"
          userCode="USER"
          selected={selectedOption}
          onChange={setSelectedOption}
          onClick={onClick}
        />
        <UserItem
          name="송민수"
          email="thdalstn6352@naver.com"
          userCode="USER"
          selected={selectedOption}
          onChange={setSelectedOption}
          onClick={onClick}
        />
        <UserItem
          name="송민수"
          email="thdalstn6352@naver.com"
          userCode="USER"
          selected={selectedOption}
          onChange={setSelectedOption}
          onClick={onClick}
        />
      </UserBox>
    </>
  );
};

export default FindUserSection;
