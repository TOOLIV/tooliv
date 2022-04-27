/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import Logo from '../common/Logo';

const NavContainer = styled.div`
  padding: 0px 40px;
  background-color: #ff9e89;
  display: flex;
  align-items: center;
  height: 40px;
  .text {
    margin-left: 40px;
    font-weight: 600;
    font-size: 16px;
    color: white;
  }
`;

const textStyle = css`
  margin-left: 40px;
  font-weight: 600;
  font-size: 16px;
  color: white;
`;

const Nav = () => {
  const navigate = useNavigate();

  return (
    <NavContainer>
      <Logo />
      {/* <div className='text'>안녕하세요. </div> */}
      <div css={textStyle}>안녕하세요. </div>
      <div onClick={() => navigate('admin/auth')}>관리</div>
      <div onClick={() => navigate('login')}>로그인</div>
      <div onClick={() => navigate('join')}>회원가입</div>
    </NavContainer>
  );
};

export default Nav;
