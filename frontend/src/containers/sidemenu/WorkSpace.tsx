import styled from "@emotion/styled";
import React from "react";
import { useRecoilState } from "recoil";
import Icons from "../../components/common/Icons";
import MenuTemplate from "../../components/home/sidemenu/MenuTemplate";
import { isOpenSide } from "../../recoil/atom";

const TopContainer = styled.div`
  display: flex;
  border-radius: 0 50px 0 0;
  padding: 16px 24px 12px 24px;
  width: 280px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const WorkSpace = () => {
  const [isOpen, setIsOpen] = useRecoilState<boolean>(isOpenSide);
  const onClickSide = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <TopContainer>
      <MenuTemplate title="워크 스페이스" />
      <Icons icon="anglesLeft" onClick={onClickSide} />
    </TopContainer>
  );
};

export default WorkSpace;
