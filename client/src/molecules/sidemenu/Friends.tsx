import styled from "@emotion/styled";
import React from "react";
import Icons from "../../atoms/common/Icons";
import Avatar from "../../atoms/profile/Avatar";
import Label from "../../atoms/sidemenu/Label";
import MenuTemplate from "../../atoms/sidemenu/MenuTemplate";
import { sideMenuType } from "../../types/sidemenu/sideMenuType";
import { SideWrapper, TopContainer } from "./Channels";

const FriendsContainer = styled.div`
  padding: 0 24px 16px 24px;
`;
const FriendContainer = styled.div`
  display: flex;
  height: 30px;
  align-items: center;
  padding-left: 8px;
`;

const Friends = () => {
  const dummyData: sideMenuType[] = [
    {
      id: "0",
      name: "손창현",
    },
    {
      id: "1",
      name: "이다예",
    },
  ];
  return (
    <>
      <TopContainer>
        <MenuTemplate title="친구" />
        <Icons icon="plus" />
      </TopContainer>
      <FriendsContainer>
        {dummyData.map((friend) => (
          <FriendContainer key={friend.id}>
            <SideWrapper>
              <Avatar />
            </SideWrapper>
            <Label {...friend} />
          </FriendContainer>
        ))}
      </FriendsContainer>
    </>
  );
};

export default Friends;
