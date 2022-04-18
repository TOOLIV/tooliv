import React from "react";
import { useNavigate } from "react-router-dom";
import Icons from "../components/common/Icons";
import LargeIcons from "../components/common/LargeIcons";
import FunctionButton from "../components/meeting/FunctionButton";

const Main = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("meeting");
  };
  return <div onClick={onClick}>Main</div>;
};

export default Main;
