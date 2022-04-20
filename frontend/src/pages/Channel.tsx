import styled from "@emotion/styled";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isOpenSide } from "../recoil/atom";

const Container = styled.div<{ isOpen: boolean }>`
  width: 100%;
  position: absolute;
  margin-top: 30px;
  margin-left: ${(props) => (props.isOpen ? "340px" : "60px")};
`;

const Channel = () => {
  const [isOpen, setIsOpen] = useRecoilState<boolean>(isOpenSide);
  const navigate = useNavigate();
  // const onClick = () => {
  //   navigate("meeting");
  // };
  return <Container isOpen={isOpen}>Channel</Container>;
};

export default Channel;
