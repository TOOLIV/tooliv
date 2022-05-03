/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import styled from '@emotion/styled';
import Text from 'atoms/text/Text';
import InputBox from 'molecules/inputBox/InputBox';
import { useNavigate } from 'react-router-dom';
import Logo from '../common/Logo';

const NavContainer = styled.div`
  padding: 0px 20px;
  /* background-color: #ff9e89; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  .text {
    margin-left: 40px;
    font-weight: 600;
    font-size: 16px;
    color: white;
  }
`;
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 50px;
`;
const InputContainer = styled.div`
  width: 430px;
`;
const Nav = () => {
  const navigate = useNavigate();

  return (
    <NavContainer>
      <LogoContainer>
        <Logo />
        <Text size={18}>TOOLIV</Text>
      </LogoContainer>
      <InputContainer>
        <InputBox label="" placeholder="검색" />
      </InputContainer>
      <div onClick={() => navigate('admin/auth')}>관리</div>
      {/* <div onClick={() => navigate('login')}>로그인</div> */}
      {/* <div onClick={() => navigate('join')}>회원가입</div> */}
    </NavContainer>
  );
};

export default Nav;
