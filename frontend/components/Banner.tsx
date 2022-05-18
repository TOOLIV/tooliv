import styled from "@emotion/styled";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { MutableRefObject, useRef, useState } from "react";
import a1 from "/public/assets/images/a1.png";
import Wavy from "/public/assets/images/Wavy.png";
import Download from "/public/assets/images/download-solid.svg";
import Rightarrow from "/public/assets/images/arrow-right-solid.svg";
import Question from "/public/assets/images/circle-question-solid.svg";
import Tooltip, { Mode, Pos, TooltipType } from "./Tooltip";

const StyledBanner = styled.div`
  width: 100%;
  min-height: ${a1.height + "px"};
  height: ${Wavy.height + "px"};
  background-image: url(${Wavy.src});
  background-color: #fce8e4;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6rem;
  position: relative;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const TitleContainer = styled.div`
  font-weight: 700;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .slogan {
    font-size: 24px;
  }
  .title {
    font-size: 36px;
  }
  z-index: 1;
`;

const FunctionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Buttons = styled.div`
  display: flex;
  gap: 30px;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ToolTipContainer = styled.div`
  padding: 5px;
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  z-index: 1;
  cursor: help;
  background-color: #ff9e89;

  .desc {
    font-size: 14px;
    font-weight: 600;
    color: white;
  }
`;

const Button = styled.button`
  width: 200px;
  height: 40px;
  background-color: white;
  border: none;
  border-radius: 45px;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  z-index: 1;
`;

const WebShortcutsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  font-size: 16px;
  color: black;
  cursor: pointer;
  z-index: 1;

  :hover {
    text-decoration: underline;
  }
`;

const ImageContainer = styled.div`
  position: absolute;
  top: 25%;
  left: 15%;
  z-index: 0;
  min-width: 380px;
  @media screen and (max-width: 1280px) {
    left: 0;
  }
`;

export type BannerPropsType = {
  OS: string;
  header: any;
};

const Banner = ({ OS, header }: BannerPropsType) => {
  const nav = useRouter();
  const communityTooltipRef = useRef<HTMLDivElement>(null);
  const enterpriseTooltipRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClientPos, setIsClientPos] = useState<Pos>({
    clientX: 0,
    clientY: 0,
  });
  const [isMod, setIsMod] = useState<Mode>();

  const onDownload = () => {
    if (OS === "Windows") {
      window.open("ms-windows-store://pdp/?ProductId=9NKJZGWHDTNN");
    } else {
      alert("준비 중입니다.");
    }
  };

  const shortcutsWeb = () => {
    nav.push("https://k6a402.p.ssafy.io/app");
  };

  const onMouseEnter = (e: any, mod: Mode) => {
    setIsClientPos({
      clientX: e.clientX,
      clientY: e.clientY,
    });
    setIsMod({ mod: mod.mod });
    setIsModalOpen(true);
  };
  const onMouseLeave = () => {
    setIsModalOpen(false);
  };

  return (
    <StyledBanner>
      {isModalOpen && (
        <Tooltip
          pos={{ clientX: isClientPos.clientX, clientY: isClientPos.clientY }}
          mod={{ mod: isMod?.mod! }}
        />
      )}
      <InnerContainer>
        <ImageContainer>
          <Image src={a1} alt="illustratro" />
        </ImageContainer>
        <TitleContainer>
          <div className="slogan">협업을 위한 새로운 선택</div>
          <div className="title">TOOLIV</div>
        </TitleContainer>
        <FunctionContainer>
          <Buttons>
            <ButtonContainer>
              <Button onClick={onDownload}>
                <Download width={16} /> COMMUNITY 다운로드
              </Button>
              <ToolTipContainer
                onMouseEnter={(e: any) => onMouseEnter(e, { mod: "com" })}
                onMouseLeave={onMouseLeave}
              >
                <Question fill="#ffffff" width="20px" />
                <div className="desc">COMMUNITY?</div>
              </ToolTipContainer>
            </ButtonContainer>
            <ButtonContainer>
              <Button>
                <Download width={16} />
                ENTERPRISE 다운로드
              </Button>
              <ToolTipContainer
                onMouseEnter={(e: any) => onMouseEnter(e, { mod: "ent" })}
                onMouseLeave={onMouseLeave}
              >
                <Question fill="#ffffff" width="20px" />
                <div className="desc">ENTERPRISE?</div>
              </ToolTipContainer>
            </ButtonContainer>
          </Buttons>
          <WebShortcutsContainer onClick={shortcutsWeb}>
            <Rightarrow width={16} fill={"#000000"} /> TOOLIV COMMUNITY 이용하기
          </WebShortcutsContainer>
        </FunctionContainer>
      </InnerContainer>
    </StyledBanner>
  );
};

export default Banner;
