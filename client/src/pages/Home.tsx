import styled from "@emotion/styled";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import Nav from "../atoms/home/Nav";
import SideMenu from "../organisms/sidemenu/SideMenu";
import { isOpenSide } from "../recoil/atom";

const Wrapper = styled.div<{ isOpen: boolean }>`
  position: absolute;
  margin-top: 30px;
  margin-left: ${(props) => (props.isOpen ? "340px" : "60px")};
  width: ${(props) =>
    props.isOpen ? "calc(100% - 400px)" : "calc(100% - 120px)"};
  height: calc(100% - 70px);
  /* width: calc(100% - 400px); */
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100vh - 40px);
`;

const Home = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useRecoilState<boolean>(isOpenSide);

  return (
    <>
      <Nav />
      <Container>
        <SideMenu />
        <Wrapper isOpen={isOpen}>
          <Outlet />
        </Wrapper>
      </Container>
    </>
  );
};

export default Home;
