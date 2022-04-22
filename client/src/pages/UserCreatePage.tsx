import React, { useRef } from 'react';
import InputBox from '../molecules/inputBox/InputBox';

const UserCreatePage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const onChange = () => {
    console.log(inputRef.current?.value);
  };

  return (
    <InputBox
      label="이메일"
      placeholder="회원아이디나 이름을 입력해주세요."
      ref={inputRef}
      onChange={onChange}
    />
  );
};

export default UserCreatePage;
