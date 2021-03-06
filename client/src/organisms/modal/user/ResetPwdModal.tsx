import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { changeUserPwd, updateNickname, updateProfileImage } from 'api/userApi';
import Button from 'atoms/common/Button';
import Icons from 'atoms/common/Icons';
import Label from 'atoms/label/Label';
import Avatar from 'atoms/profile/Avatar';
import Text from 'atoms/text/Text';
import InputBox from 'molecules/inputBox/InputBox';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { user } from 'recoil/auth';
import { userConfigType } from 'types/common/userTypes';

const Modal = styled.div<{ isOpen: boolean }>`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(255, 255, 255, 0.7);

  ${(props) =>
    props.isOpen &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
    `}
`;

const Container = styled.div`
  width: 500px;
  padding: 55px;
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 30px;
  border: 1px solid ${(props) => props.theme.borderColor};
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 36px;
`;

const InputContainer = styled.div`
  height: 200px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PasswordInput = styled.div`
  position: relative;
`;

const IconBox = styled.div`
  position: absolute;
  right: 13px;
  top: 27px;
`;

const ResetPwdModal = ({ isOpen, onClose }: userConfigType) => {
  const [newPwd, setNewPwd] = useState('');
  const inputPwdRef = useRef<HTMLInputElement>(null);
  const inputPwdCheckRef = useRef<HTMLInputElement>(null);

  const [pwdStatus, setPwdStatus] = useState('default');
  const [pwdCheckStatus, setPwdCheckStatus] = useState('default');
  const [inputPwdMsg, setInputPwdMsg] = useState('');
  const [inputPwdCheckMsg, setInputPwdCheckMsg] = useState('');
  const [passwordType, setPasswordType] = useState(true);
  const [passwordCheckType, setPasswordCheckType] = useState(true);

  const [pwdConfirm, setPwdConfirm] = useState(false);
  const clickPwdIcon = () => {
    setPasswordType(!passwordType);
  };
  const clickPwdCheckIcon = () => {
    setPasswordCheckType(!passwordCheckType);
  };

  const checkPwdValid = () => {
    const password = inputPwdRef.current?.value!;
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;

    if (passwordRegex.test(password)) {
      setPwdStatus('default');
      setInputPwdMsg('');
    } else {
      setPwdStatus('error');
      setInputPwdMsg(
        '8 - 20?????? ??????, ??????, ??????????????? ????????? ??????????????? ??????????????????.'
      );
    }
  };

  const checkPwdConfirm = () => {
    const password = inputPwdCheckRef.current?.value!;

    if (inputPwdRef.current?.value === password) {
      setPwdCheckStatus('success');
      setPwdConfirm(true);
      setInputPwdCheckMsg('??????????????? ???????????????.');
    } else {
      setPwdCheckStatus('error');
      setInputPwdCheckMsg('?????? ????????? ??????????????? ???????????? ??????????????????.');
    }
  };

  const exitModal = () => {
    inputPwdCheckRef.current!.value = '';
    inputPwdRef.current!.value = '';
    setPwdStatus('default');
    setInputPwdMsg('');
    setPwdCheckStatus('default');
    setInputPwdCheckMsg('');
    setPwdConfirm(false);
    onClose();
  };

  const handleResetPwd = async () => {
    const newPassword = inputPwdRef.current?.value!;
    const body = {
      password: newPassword,
    };
    try {
      await changeUserPwd(body);
      exitModal();
      alert('??????????????? ?????????????????????.');
    } catch (error) {}
  };

  return (
    <Modal isOpen={isOpen}>
      <Container>
        <Header>
          <Text size={24}>???????????? ?????????</Text>
          <Text size={24}>??????????????? ?????????????????????.</Text>
        </Header>
        <InputContainer>
          <PasswordInput>
            <InputBox
              label="????????????"
              placeholder="??????????????? ??????????????????."
              type={passwordType ? 'password' : 'text'}
              ref={inputPwdRef}
              status={pwdStatus}
              message={inputPwdMsg}
              onChange={checkPwdValid}
            />
            <IconBox>
              <Icons
                icon={passwordType ? 'visibility' : 'visibilityOff'}
                onClick={clickPwdIcon}
              />
            </IconBox>
          </PasswordInput>
          <PasswordInput>
            <InputBox
              label="???????????? ??????"
              placeholder="?????? ????????? ??????????????? ??????????????????."
              type={passwordCheckType ? 'password' : 'text'}
              ref={inputPwdCheckRef}
              status={pwdCheckStatus}
              message={inputPwdCheckMsg}
              onChange={checkPwdConfirm}
            />
            <IconBox>
              <Icons
                icon={passwordCheckType ? 'visibility' : 'visibilityOff'}
                onClick={clickPwdCheckIcon}
              />
            </IconBox>
          </PasswordInput>
        </InputContainer>
        <ButtonBox>
          <Button
            width="180"
            height="35"
            text="??????"
            bgColor="gray300"
            onClick={exitModal}
          />
          <Button
            width="180"
            height="35"
            text="??????"
            disabled={
              pwdStatus === 'error' || pwdCheckStatus === 'error' || !pwdConfirm
            }
            onClick={handleResetPwd}
          />
        </ButtonBox>
      </Container>
    </Modal>
  );
};

export default ResetPwdModal;
