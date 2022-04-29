import styled from '@emotion/styled';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserBadge from '../molecules/userBadge/UserBadge';
import Info from '../molecules/info/Info';
import InputBox from '../molecules/inputBox/InputBox';
import UserItem from '../organisms/userItem/UserItem';
import Dropdown from '../atoms/dropdown/Dropdown';
import WorkspaceModal from 'organisms/modal/WorkspaceModal';
import { colors } from 'shared/color';
import ChannelType from 'molecules/radio/channelRadio/ChannelRadio';
import ChannelModal from 'organisms/modal/ChannelModal';

const Test = () => {
  const [selectedOption, setSelectedOption] = useState({
    value: 'Default',
    label: '일반',
  });

  const onClick = () => {
    console.log('hello');
  };
  const inputRef = useRef<HTMLInputElement>(null);
  const onChange = () => {
    console.log(inputRef.current?.value);
  };

  const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 100px;
    background-color: ${colors.gray300};
  `;

  const TestDiv = styled.div`
    margin-bottom: 30px;
  `;
  return (
    <Container>
      {/* <div onClick={onClick}>
        Main
        <FunctionButton icon="exit" exit />
        <FunctionButton icon="audioOn" />
        <FunctionButton icon="videoOn" />
        <FunctionButton icon="shareMonitor" />

      </div> */}
      <TestDiv>
        <InputBox
          label="이메일"
          placeholder="회원아이디나 이름을 입력해주세요."
          message="사용가능한 이메일입니다."
          status="success"
          ref={inputRef}
          onChange={onChange}
        />
      </TestDiv>
      <TestDiv>
        <InputBox
          label="이메일"
          placeholder="회원아이디나 이름을 입력해주세요."
          message="이미 사용중인 이메일입니다."
          status="error"
          ref={inputRef}
          onChange={onChange}
        />
      </TestDiv>
      <TestDiv>
        <InputBox
          label="이메일"
          placeholder="회원아이디나 이름을 입력해주세요."
          ref={inputRef}
          onChange={onChange}
        />
      </TestDiv>
      <TestDiv>
        <UserBadge
          name="송민수"
          email="thdalstn6352@naver.com"
          onDelete={onClick}
        />
      </TestDiv>
      <TestDiv>
        <Info label="도메인" value="meeting.ssafy.com" />
      </TestDiv>

      {/* <TestDiv>
        <ChannelModal isOpen={true} onClose={() => console.log('close')} />
      </TestDiv> */}
      {/* 
      <TestDiv>
        <UserItem
          name="송민수"
          email="thdalstn6352@naver.com"
          userCode="USER"
          selected={selectedOption}
          onChange={setSelectedOption}
          onClick={onClick}
        />
      </TestDiv> */}

      {/* <TestDiv>
        <Dropdown
          defaultValue={selectedOption}
          options={[
            { value: 'Admin', label: '관리자' },
            { value: 'Default', label: '일반' },
          ]}
          onChange={setSelectedOption}
        />
      </TestDiv> */}
    </Container>
  );
};

export default Test;
