import React from "react";
import { useNavigate } from "react-router-dom";
import Icons from "../atoms/common/Icons";
import LargeIcons from "../atoms/common/LargeIcons";
import FunctionButton from "../atoms/meeting/FunctionButton";

const Main = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("meeting");
  };
  return (
    <div onClick={onClick}>
      Main
      <FunctionButton icon="exit" exit />
      <FunctionButton icon="audioOn" />
      <FunctionButton icon="videoOn" />
      <FunctionButton icon="shareMonitor" />
    </div>
  );
};

export default Main;
