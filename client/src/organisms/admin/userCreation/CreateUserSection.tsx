import styled from '@emotion/styled';
import { useDebounce } from 'hooks/useHooks';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { checkUserEmail, createUser } from '../../../api/adminApi';
import Button from '../../../atoms/common/Button';
import InputBox from '../../../molecules/inputBox/InputBox';
import { userCreationList } from '../../../recoil/atom';
// import { AdminContainer } from '../userManagement/FindUserSection';

const AdminContainer = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  /* justify-content: flex-end; */
  align-items: flex-end;
  gap: 10px;
  margin-bottom: 30px;
`;

const CreateUserSection = () => {
  const [emailStatus, setEmailStatus] = useState('default');
  const [inputMsg, setInputMsg] = useState('');
  const setUserCreationList = useSetRecoilState(userCreationList);
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputNameRef = useRef<HTMLInputElement>(null);
  const [keyword, setKeyword] = useState('');
  const debouncedValue = useDebounce<string>(keyword, 500);

  const inputEmail = useCallback(() => {
    const keyword = inputEmailRef.current?.value!;
    setKeyword(keyword);
  }, []);

  const checkEmailValid = (email: string) => {
    const emailPattern =
      /^([0-9a-zA-Z_.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

    if (emailPattern.test(email)) {
      handleEmailCheck(email);
    } else {
      setEmailStatus('default');
      setInputMsg('');
    }
  };

  const handleEmailCheck = async (email: string) => {
    try {
      await checkUserEmail(email);
      setEmailStatus('success');
      setInputMsg('사용가능한 이메일입니다.');
    } catch (error) {
      setEmailStatus('error');
      setInputMsg('이미 사용 중인 이메일입니다.');
    }
  };

  useEffect(() => {
    // 키워드 입력시 초기화 (안할 경우 이전 데이터가 남아있어 오류)
    checkEmailValid(debouncedValue);
  }, [debouncedValue]);

  const createUserInfo = async () => {
    const email = inputEmailRef.current?.value!;
    const name = inputNameRef.current?.value!;
    const body = {
      email,
      name,
      password: `Tooliv${email}`,
    };
    try {
      setUserCreationList((prev) => [...prev, body]);
      await createUser(body);
      // setEmail('');
      // setName('');
      setEmailStatus('default');
      setInputMsg('');
      inputEmailRef.current!.value = '';
      inputNameRef.current!.value = '';
    } catch (error) {}
  };

  return (
    <AdminContainer>
      <InputBox
        label="이메일"
        placeholder="사용할 이메일을 입력해주세요."
        ref={inputEmailRef}
        status={emailStatus}
        message={inputMsg}
        onChange={inputEmail}
      />
      <InputBox
        label="회원"
        placeholder="회원 이름을 입력해주세요."
        ref={inputNameRef}
      />
      <Button
        width="50"
        height="35"
        text="추가"
        onClick={createUserInfo}
        disabled={emailStatus === 'error'}
      />
    </AdminContainer>
  );
};

export default CreateUserSection;
