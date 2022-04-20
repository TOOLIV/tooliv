import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icons from '../atoms/common/Icons';
import Info from '../atoms/info/Info';
import Input from '../atoms/input/Input';
import FunctionButton from '../atoms/meeting/FunctionButton';
import UserBadge from '../atoms/userBadge/UserBadge';

const Test = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate('meeting');
  };
  const inputRef = useRef<HTMLInputElement>(null);
  const onChange = () => {
    console.log(inputRef.current?.value);
  };
  return (
    <>
      {/* <div onClick={onClick}>
        Main
        <FunctionButton icon="exit" exit />
        <FunctionButton icon="audioOn" />
        <FunctionButton icon="videoOn" />
        <FunctionButton icon="shareMonitor" />

      </div> */}
      <div>
        <Input
          label="이메일"
          placeholder="회원아이디나 이름을 입력해주세요."
          message="사용가능한 이메일입니다."
          status="success"
          ref={inputRef}
          onChange={onChange}
        />
        <Input
          label="이메일"
          placeholder="회원아이디나 이름을 입력해주세요."
          message="이미 사용중인 이메일입니다."
          status="error"
          ref={inputRef}
          onChange={onChange}
        />
        <Input
          label="이메일"
          placeholder="회원아이디나 이름을 입력해주세요."
          ref={inputRef}
          onChange={onChange}
        />
      </div>
      <div>
        <UserBadge
          name="송민수"
          email="thdalstn6352@naver.com"
          onClick={onClick}
        />
      </div>
      <div>
        <Info label="도메인" value="meeting.ssafy.com" />
      </div>
    </>
  );
};

export default Test;
