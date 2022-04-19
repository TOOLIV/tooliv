import styled from "@emotion/styled";
import React from "react";
import Icons from "../../atoms/common/Icons";
import MenuTemplate from "../../atoms/sidemenu/MenuTemplate";

export const TopContainer = styled.div`
  display: flex;
  padding: 16px 24px 12px 24px;
  width: 280px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Channels = () => {
  return (
    <TopContainer>
      <MenuTemplate title="채널" />
      <Icons icon="plus" />
    </TopContainer>
  );
};

export default Channels;
