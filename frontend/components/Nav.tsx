import styled from "@emotion/styled";
import React from "react";
import Logo from "../public/assets/images/Tooliv.png";
import Image from "next/image";

const Container = styled.div`
  height: 48px;
  background-color: #fce8e4;
  display: flex;
  justify-content: center;
`;

const NavContainer = styled.div`
  width: 70vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    padding: 0 2rem;
    width: 100%;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  .title {
    font-size: 20px;
    font-weight: 700;
  }
`;
const NavItems = styled.div`
  display: flex;
  gap: 5rem;
`;
const NavItem = styled.div`
  font-size: 14px;
  font-weight: 700;

  cursor: pointer;
`;


const Nav = () => {
  const onClick = () => {
    window.open("https://team-tooliv.gitbook.io/tooliv-docs");
  }
  return (
    <Container>
      <NavContainer>
        <LogoContainer>
          <Image src={Logo} width={36} height={36} alt="logo" />
          <div className="title">TOOLIV</div>
        </LogoContainer>
        <NavItems>
          {/* <NavItem>DOWNLOAD</NavItem> */}
          <NavItem onClick={onClick}>DOCS</NavItem>
        </NavItems>
      </NavContainer>
    </Container>
  );
};

export default Nav;
