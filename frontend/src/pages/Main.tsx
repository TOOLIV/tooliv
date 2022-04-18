import React from "react";
import { useNavigate } from "react-router-dom";
import Icons from "../components/common/Icons";
import LargeIcons from "../components/common/LargeIcons";

const Main = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("meeting");
  };
  return (
    <div onClick={onClick}>
      Main
      <Icons icon="videoOn" />
      <Icons icon="videoOff" />
      <Icons icon="setting" />
      <Icons icon="public" />
      <Icons icon="lock" />
      <Icons icon="monitor" />
      <Icons icon="person" />
      <Icons icon="plus" />
      <Icons icon="audioOn" />
      <Icons icon="audioOff" />
      <Icons icon="anglesLeft" />
      <Icons icon="anglesRight" />
      <Icons icon="addPerson" />
      <Icons icon="shareMonitor" />
      <Icons icon="xMark" />
      <Icons icon="exit" />
    </div>
  );
};

export default Main;
