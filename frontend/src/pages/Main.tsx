import React from "react";
import { useNavigate } from "react-router-dom";
import Icons from "../atoms/common/Icons";
import FunctionButton from "../atoms/meeting/FunctionButton";

const Main = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("meeting");
  };
  return <div onClick={onClick}>Main</div>;
};

export default Main;
