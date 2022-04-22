/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import styled from "@emotion/styled";
import Logo from "../common/Logo";

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
  return (
    <NavContainer>
      <Logo />
      {/* <div className='text'>안녕하세요. </div> */}
      <div css={textStyle}>안녕하세요. </div>
    </NavContainer>
  );
};

export default Nav;
