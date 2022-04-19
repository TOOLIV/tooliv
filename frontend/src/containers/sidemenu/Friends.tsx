import React from "react";
import Icons from "../../components/common/Icons";
import MenuTemplate from "../../components/sidemenu/MenuTemplate";
import { TopContainer } from "./Channels";

const Friends = () => {
  return (
    <TopContainer>
      <MenuTemplate title="친구" />
      <Icons icon="plus" />
    </TopContainer>
  );
};

export default Friends;
