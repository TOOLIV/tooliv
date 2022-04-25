import React, { useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { checkUserEmail, createUser } from '../../../api/userApi';
import Button from '../../../atoms/common/Button';
import InputBox from '../../../molecules/inputBox/InputBox';
import { userCreationList } from '../../../recoil/atom';

const CreateUserSection = () => {
  const [emailStatus, setEmailStatus] = useState('default');
  const [inputMsg, setInputMsg] = useState('');
  const setUserCreationList = useSetRecoilState(userCreationList);
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputNameRef = useRef<HTMLInputElement>(null);
  const emailPattern =
    /^([0-9a-zA-Z_.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

  const checkEmailValid = () => {
    const email = inputEmailRef.current?.value!;
    if (emailPattern.test(email)) {
      console.log(email);
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

  // const getUserName = () => {
  //   const name = inputNameRef.current?.value!;
  //   console.log(name);
  // };

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
    <div>
      <InputBox
        label="이메일"
        placeholder="사용할 이메일을 입력해주세요."
        ref={inputEmailRef}
        status={emailStatus}
        message={inputMsg}
        onChange={checkEmailValid}
      />
      <InputBox
        label="회원"
        placeholder="회원 이름을 입력해주세요."
        ref={inputNameRef}
      />
      <Button width="50" height="35" text="추가" onClick={createUserInfo} />
    </div>
  );
};

export default CreateUserSection;
