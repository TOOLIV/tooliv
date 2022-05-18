import styled from "@emotion/styled";
import React from "react";

const TooltipModalContainer = styled.div<{ position: Pos }>`
  position: absolute;
  top: ${(props) => props.position.clientX};
  left: ${(porps) => porps.position.clientY};
  background-color: #ffffffdd;
  z-index: 2;
  padding: 20px;
  font-size: 14px;
  border-radius: 10px;
  /* border: 2px solid black; */
`;

const TooltipContainer = styled.div`
  font-size: 14px;
  font-weight: 700;
`;

export type TooltipType = {
  pos: Pos;
  mod: Mode;
};

export type Pos = {
  clientX: number;
  clientY: number;
};

export type Mode = {
  mod: "com" | "ent";
};

const CommunityDescription = () => {
  return (
    <TooltipContainer>
      TOOLIV COMMUNITY Edition는 누구나 쉽게 이용 가능한 &apos;퍼블릭
      버전&apos;입니다.
      <br />
      <br />
      COMMUNITY Edition는 모든 데이터 및 파일들을 TOOLIV에서 관리하기 때문에
      <br />
      TOOLIV을 소통 용도로 사용하는 &apos;일반 사용자&apos;에게 적합합니다.
      <br />
      <br />
      사용자들은 추가적인 작업 없이 서비스를 이용할 수 있도록 제공됩니다.
      <br />
      웹과 데스크탑(다운로드)에서 동시에 이용 가능합니다.
    </TooltipContainer>
  );
};

const EnterpriseDescription = () => {
  return (
    <TooltipContainer>
      TOOLIV ENTERPRISE Edition는 기업 내에서 협업을 위해 제공되는
      &apos;프라이빗 버전&apos;입니다.
      <br />
      <br />
      모든 데이터 및 파일들을 자체적으로 관리하기를 원하는 &apos;기업
      사용자&apos;에게 적합합니다.
      <br />
      <br />
      개발자 혹은 서버 관리자가 직접 설치 가능하도록 전체 소프트웨어를 공개하고
      있습니다.
      <br />
      * DOCS - Deployment (설치 가이드)를 참고하세요 *
      <br />
      <br />
      설치가 완료된 이후에는 웹과 데스크탑 앱(다운로드)에서 동시에 이용
      가능합니다.
    </TooltipContainer>
  );
};

const Tooltip = ({ pos, mod }: TooltipType) => {
  return (
    <TooltipModalContainer
      position={{ clientX: pos.clientX, clientY: pos.clientY - 20 }}
    >
      {mod.mod === "com" && CommunityDescription()}
      {mod.mod === "ent" && EnterpriseDescription()}
    </TooltipModalContainer>
  );
};

export default Tooltip;
