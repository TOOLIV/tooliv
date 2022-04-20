import styled from "@emotion/styled";
import React from "react";
import Icons from "../../atoms/common/Icons";
import Label from "../../atoms/sidemenu/Label";
import MenuTemplate from "../../atoms/sidemenu/MenuTemplate";
import { sideMenuType } from "../../types/sidemenu/sideMenuType";

export const TopContainer = styled.div`
  display: flex;
  padding: 16px 24px 12px 24px;
  width: 280px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChannelContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 24px;
  height: 35px;
  padding-left: 10px;
  /* 선택된 채널만 */
  &:nth-child(1) {
    background-color: ${(props) => props.theme.pointColor};
    border-radius: 10px 0 0 10px;
    border-right: 4px solid ${(props) => props.theme.secondPointColor};
  }
`;
const Wrapper = styled.div`
  margin-right: 10px;
`;

const Channels = () => {
  const dummyData: sideMenuType[] = [
    {
      id: "0",
      name: "1. 공지사항",
    },
    {
      id: "1",
      name: "2. 잡담",
    },
  ];
  return (
    <>
      <TopContainer>
        <MenuTemplate title="채널" />
        <Icons icon="plus" />
      </TopContainer>
      <div>
        {dummyData.map((channel) => (
          <ChannelContainer>
            <Wrapper>
              <Icons icon="lock" />
            </Wrapper>
            <Label key={channel.id} {...channel} />
          </ChannelContainer>
        ))}
      </div>
    </>
  );
};

export default Channels;
