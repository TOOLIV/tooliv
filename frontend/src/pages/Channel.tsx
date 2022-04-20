import React from "react";
import { useNavigate } from "react-router-dom";

const Channel = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("meeting");
  };
  return <div onClick={onClick}>Main</div>;
};

export default Channel;
