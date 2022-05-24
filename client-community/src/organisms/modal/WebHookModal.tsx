import styled from '@emotion/styled';
import Button from 'atoms/common/Button';
import Icons from 'atoms/common/Icons';
import Dropdown from 'atoms/dropdown/Dropdown';
import Input from 'atoms/input/Input';
import Label from 'atoms/label/Label';
import Text from 'atoms/text/Text';
import InputBox from 'molecules/inputBox/InputBox';
import { BulrContainer } from 'organisms/meeting/video/ScreenShareModal';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { user } from 'recoil/auth';
import { colors } from 'shared/color';
import { webHookModalType } from 'types/channel/contentType';
import { userSelectorTypes } from 'types/common/userTypes';

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  padding: 25px;
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 30px;
  border: 1px solid ${(props) => props.theme.borderColor};
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* margin-bottom: 16px; */
`;

const Description = styled.div`
  margin-bottom: 16px;
`;

const ButtonBox = styled.div`
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

const WebHookModal = ({ isOpen, onClose, channelId }: webHookModalType) => {
  const [webHookName, setWebHookName] = useState('');
  const inputNameRef = useRef<HTMLInputElement>(null);
  const userInfo = useRecoilValue(user);
  const [options, setOptions] = useState([
    { value: userInfo.userId, label: userInfo.nickname },
  ]);
  const [selectedOption, setSelectedOption] = useState({
    value: userInfo.userId,
    label: userInfo.nickname,
  });

  const onChange = () => {
    setWebHookName(inputNameRef.current?.value!);
  };

  const onSubmit = () => {
    console.log(webHookName, channelId, selectedOption);
  };

  const handleChangeUser = (data: userSelectorTypes) => {
    setSelectedOption(data);
  };

  useEffect(() => {
    // bot 리스트 불러오는 코드
  }, []);

  if (!isOpen) return <></>;
  return (
    <BulrContainer>
      <Container>
        <div>
          <Header>
            <Text size={18}>WebHook</Text>
            <Icons icon="xMark" width="32" height="32" onClick={onClose} />
          </Header>
          <Description>
            <Text size={12}>등록한 WebHook 메세지를 받아볼 수 있습니다.</Text>
          </Description>
        </div>
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
      </Container>
    </BulrContainer>
  );
};

export default WebHookModal;
