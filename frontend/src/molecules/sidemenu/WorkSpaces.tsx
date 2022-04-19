import styled from "@emotion/styled";
import React from "react";
import { useRecoilState } from "recoil";
import Icons from "../../atoms/common/Icons";
import MenuTemplate from "../../atoms/sidemenu/MenuTemplate";
import WorkSpace from "../../atoms/sidemenu/WorkSpace";
import { isOpenSide } from "../../recoil/atom";
import { workSpaceType } from "../../types/workspace/workSpaceType";

const TopContainer = styled.div`
  display: flex;
  border-radius: 0 50px 0 0;
  padding: 16px 24px 16px 24px;
  width: 280px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const WorkSpaceContainer = styled.div<{ isOpen: boolean }>`
  display: flex;
  width: 100%;
  padding: 0 24px 16px 24px;
  border-bottom: ${(props) => props.isOpen && "1px solid #ffffff"};
`;

const WorkSpaces = () => {
  const [isOpen, setIsOpen] = useRecoilState<boolean>(isOpenSide);
  const onClickSide = () => {
    setIsOpen((prev) => !prev);
  };

  const dummyData: workSpaceType[] = [
    {
      id: "0",
      name: "서울 4반",
    },
    {
      id: "1",
      name: "전체",
    },
  ];
  return (
    <>
      <TopContainer>
        <MenuTemplate title="워크 스페이스" />
        <Icons
          icon={isOpen ? "anglesLeft" : "anglesRight"}
          onClick={onClickSide}
        />
      </TopContainer>
      <WorkSpaceContainer isOpen={isOpen}>
        {dummyData.map((workspace) => (
          <WorkSpace key={workspace.id} {...workspace} />
        ))}
      </WorkSpaceContainer>
    </>
  );
};

export default WorkSpaces;
