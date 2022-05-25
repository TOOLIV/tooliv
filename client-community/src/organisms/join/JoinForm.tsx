import styled from '@emotion/styled';
import Icons from 'atoms/common/Icons';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { join } from '../../api/userApi';
import Button from '../../atoms/common/Button';
import Text from '../../atoms/text/Text';
import InputBox from '../../molecules/inputBox/InputBox';
import { toast } from 'react-toastify';

const Container = styled.div`
  width: 480px;
  padding: 65px;
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 30px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.06);
`;

const TextBox = styled.div`
  margin-bottom: 30px;
`;

const InputArea = styled.form`
  & > :not(div:last-of-type) {
    margin-bottom: 15px;
  }
  margin-bottom: 30px;
`;

const SignUpBox = styled.div`
  width: 55%;
  display: flex;
  justify-content: space-between;
  margin-top: 7px;
  margin-left: auto;
`;
const PasswordInput = styled.div`
  position: relative;
`;
const IconBox = styled.div`
  position: absolute;
  right: 13px;
  top: 27px;
`;

const JoinForm = () => {
  const inputNameRef = useRef<HTMLInputElement>(null);
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [emailStatus, setEmailStatus] = useState('default');
  const [inputEmailMsg, setInputEmailMsg] = useState('');

  const [pwdStatus, setPwdStatus] = useState('default');
  const [inputPwdMsg, setInputPwdMsg] = useState('');

  const [passwordType, setPasswordType] = useState(true);

  const clickPwdIcon = () => {
    setPasswordType(!passwordType);
  };

  const checkEmailValid = () => {
    const email = inputEmailRef.current?.value!;
    const emailRegex =
      /^([0-9a-zA-Z_.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

    if (emailRegex.test(email)) {
      setEmailStatus('default');
      setInputEmailMsg('');
    } else {
      setEmailStatus('error');
      setInputEmailMsg('올바른 이메일 형식으로 입력해주세요.');
    }
  };

  const checkPwdValid = () => {
    const password = inputPasswordRef.current?.value!;
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;

    if (passwordRegex.test(password)) {
      setPwdStatus('default');
      setInputPwdMsg('');
    } else {
      setPwdStatus('error');
      setInputPwdMsg(
        '8 - 20자로 영어, 숫자, 특수문자가 포함된 비밀번호를 입력해주세요.'
      );
    }
  };

  const handleJoin = async () => {
    const name = inputNameRef.current?.value!;
    const email = inputEmailRef.current?.value!;
    const password = inputPasswordRef.current?.value!;

    const body = {
      name,
      email,
      password,
    };
    try {
      await join(body);
      toast.success('회원가입에 성공했습니다.');
      navigate('/login');
    } catch (error) {
      toast.error('회원가입에 실패했습니다.');
    }
  };

  return (
    <Container>
      <TextBox>
        <Text size={36} weight={'bold'}>
          회원가입
        </Text>
      </TextBox>
      <InputArea>
        <InputBox
          label="이름"
          placeholder="이름을 입력해주세요."
          ref={inputNameRef}
        />
        <InputBox
          label="이메일"
          placeholder="사용하실 이메일을 입력해주세요."
          ref={inputEmailRef}
          status={emailStatus}
          message={inputEmailMsg}
          onChange={checkEmailValid}
        />
        <PasswordInput>
          <InputBox
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            type={passwordType ? 'password' : 'text'}
            ref={inputPasswordRef}
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
      </InputArea>
      <Button
        width="350"
        text="회원가입"
        onClick={handleJoin}
        disabled={emailStatus === 'error' || pwdStatus === 'error'}
      />
      <SignUpBox>
        <Text size={12} color={'gray400'}>
          이미 TOOLIV 회원이신가요?
        </Text>
        <Text
          size={12}
          onClick={() => {
            navigate('/login');
          }}
        >
          로그인
        </Text>
      </SignUpBox>
    </Container>
  );
};

export default JoinForm;
