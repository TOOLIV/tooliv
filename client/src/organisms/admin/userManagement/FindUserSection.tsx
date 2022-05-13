import styled from '@emotion/styled';
import { useDebounce } from 'hooks/useHooks';
import UserItem from 'organisms/userItem/UserItem';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { changeCode, deleteUser, findUser } from '../../../api/adminApi';
import InputBox from '../../../molecules/inputBox/InputBox';
import {
  userCodeTypes,
  userListType,
  userListTypes,
} from '../../../types/common/userTypes';

export const AdminContainer = styled.div`
  width: 500px;
`;
const UserBox = styled.div`
  height: 50vh;
  overflow-y: scroll;
  overflow-x: hidden;
`;
const FindUserSection = () => {
  const [userList, setUserList] = useState<userListType[]>([]);
  const [keyword, setKeyword] = useState('');

  const debouncedValue = useDebounce<string>(keyword, 500);
  const [sequence, setSequence] = useState(1);
  const [target, setTarget] = useState<any>(null);
  const [endCheck, setEndCheck] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const sequenceRef = useRef(sequence);
  sequenceRef.current = sequence;

  const endCheckRef = useRef(endCheck);
  endCheckRef.current = endCheck;

  const inputRef = useRef<HTMLInputElement>(null);
  const [flag, setFlag] = useState(false);

  const searchUserList = useCallback(() => {
    const keyword = inputRef.current?.value!;
    setKeyword(keyword);
  }, []);

  const changeUserCode = (value: string, email: string) => {
    const body = { userCode: value, email };
    userCodeApi(body);
  };

  const userListApi = async (keyword: string) => {
    if (!endCheckRef.current) {
      const response = await findUser(keyword, sequenceRef.current);
      const data = response.data.userInfoResponseDTOList;

      if (data.length === 0) {
        setIsLoaded(false);
        setEndCheck(true);
        return;
      }
      setFlag(true);
      console.log(userList);
      setUserList((prev) => [...prev, ...data]);
      setSequence((prev) => prev + 1);
    }
  };

  const userCodeApi = async (body: userCodeTypes) => {
    const response = await changeCode(body);
    console.log(response);
  };

  const onDelete = (email: string) => {
    handleDeleteUser(email);
  };

  const handleDeleteUser = async (email: string) => {
    const response = await deleteUser(email);
    initData();
  };

  const initData = useCallback(() => {
    console.log('init!');
    setSequence(1);
    setEndCheck(false);
    setUserList([]);
  }, []);

  useEffect(() => {
    if (flag) {
      initData();
      // userListApi(debouncedValue);
    }
  }, [debouncedValue]);

  useEffect(() => {
    let observer: any;
    // 스크롤이 마지막에 도달할 경우
    if (target) {
      console.log('스크롤');
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.2,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target, debouncedValue]);

  // 스크롤이 마지막에 도달시 호출되는 함수
  const onIntersect = async ([entry]: any, observer: any) => {
    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target);
      await userListApi(debouncedValue);
      observer.observe(entry.target);
    }
  };

  return (
    <AdminContainer>
      <InputBox
        label="이메일"
        placeholder="회원 이름을 입력해주세요."
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
        <div
          ref={setTarget}
          style={{
            width: '100vw',
            height: '5px',
          }}
        ></div>
      </UserBox>
    </AdminContainer>
  );
};

export default FindUserSection;
