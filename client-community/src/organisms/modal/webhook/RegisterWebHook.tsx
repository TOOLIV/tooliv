import styled from '@emotion/styled';
import { createWebHook } from 'api/chatApi';
import Button from 'atoms/common/Button';
import Dropdown from 'atoms/dropdown/Dropdown';
import Label from 'atoms/label/Label';
import InputBox from 'molecules/inputBox/InputBox';
import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { user } from 'recoil/auth';
import { colors } from 'shared/color';
import { userSelectorTypes } from 'types/common/userTypes';

const ButtonBox = styled.div`
  position: absolute;
  bottom: 25px;
  right: 25px;
  width: 50%;
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
  margin-left: auto;
`;

const DropdownBox = styled.div`
  border: 1px solid ${colors.gray400};
  border-radius: 5px;
`;

type registerWebHookPropsType = {
  onClose: () => void;
};

const RegisterWebHook = ({ onClose }: registerWebHookPropsType) => {
  const { channelId } = useParams();
  const [webHookName, setWebHookName] = useState('');
  const userInfo = useRecoilValue(user);
  const [options, setOptions] = useState([
    { value: userInfo.userId, label: userInfo.nickname },
  ]);
  const inputNameRef = useRef<HTMLInputElement>(null);
  const onChange = () => {
    setWebHookName(inputNameRef.current?.value!);
  };
  const [selectedOption, setSelectedOption] = useState({
    value: userInfo.userId,
    label: userInfo.nickname,
  });

  const onSubmit = () => {
    createWebHook(channelId!, webHookName, userInfo.userId).then(() => {});
  };
  const handleChangeUser = (data: userSelectorTypes) => {
    setSelectedOption(data);
  };

  return (
    <>
      <InputBox
        label="WebHook 이름"
        placeholder="등록할 WebHook의 이름을 넣어주세요."
        onChange={onChange}
        ref={inputNameRef}
      />
      <div>
        <Label label="보낼 사람" />
        <DropdownBox>
          <Dropdown
            onChange={handleChangeUser}
            options={options}
            selected={selectedOption}
          />
        </DropdownBox>
      </div>
      <ButtonBox>
        <Button
          width="125"
          height="35"
          text="취소"
          bgColor="gray300"
          onClick={onClose}
        />
        <Button width="125" height="35" text="등록" onClick={onSubmit} />
      </ButtonBox>
    </>
  );
};

export default RegisterWebHook;
