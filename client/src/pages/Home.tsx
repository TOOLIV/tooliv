import styled from "@emotion/styled";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Nav from "../atoms/home/Nav";
import SideMenu from "../organisms/sidemenu/SideMenu";

const SideMenuContainer = styled.div`
  margin-top: 24px;
  background-color: ${(props) => props.theme.sideBgColor};
  border-radius: 0 50px 0 0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100vh - 40px);
`;

const Home = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("meeting");
  };

  return (
    <>
      <Nav />
      <Container>
        <SideMenu />
        <Outlet />
      </Container>
    </>
  );
};

export default Home;
