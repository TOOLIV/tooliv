import styled from '@emotion/styled';
import UserItem from 'organisms/userItem/UserItem';
import React, { useEffect, useRef, useState } from 'react';
import { changeCode, deleteUser, findUser } from '../../../api/adminApi';
import InputBox from '../../../molecules/inputBox/InputBox';
import { userCodeTypes, userListTypes } from '../../../types/common/userTypes';

export const AdminContainer = styled.div`
  width: 470px;
`;
const UserBox = styled.div`
  height: 50vh;
`;
const FindUserSection = () => {
  const [userList, setUserList] = useState([]);
  const [keyword, setKeyword] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const searchUserList = () => {
    console.log(inputRef.current?.value);
    const keyword = inputRef.current?.value!;
    setKeyword(keyword);
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

  const onDelete = (id: string) => {
    // 회원삭제 기능 구현
    handleDeleteUser(id);
  };

  const handleDeleteUser = async (email: string) => {
    const response = await deleteUser(email);
    userListApi(keyword);
    console.log(response);
  };

  useEffect(() => {
    userListApi(keyword);
  }, [keyword]);

  return (
    <AdminContainer>
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
            nickname={user.nickname}
            profileImage={user.profileImage}
            email={user.email}
            userCode={user.userCode}
            statusCode={user.statusCode}
            onDelete={onDelete}
            onChange={changeUserCode}
          />
        ))}
      </UserBox>
    </AdminContainer>
  );
};

export default FindUserSection;
