import styled from "@emotion/styled";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import a1 from "/public/assets/images/a1.png";
import Wavy from "/public/assets/images/Wavy.png";
import Download from "/public/assets/images/download-solid.svg";
import Rightarrow from "/public/assets/images/arrow-right-solid.svg";

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

const ButtonContainer = styled.div`
  display: flex;
  gap: 30px;
  justify-content: center;
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
  color: white;
  cursor: pointer;
  z-index: 1;
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

  const onDownload = () => {
    if (OS === "Windows") {
      window.open("https://www.microsoft.com/store/productId/9NKJZGWHDTNN");
    }
  };

  const shortcutsWeb = () => {
    nav.push("https://k6a402.p.ssafy.io/app");
  };

  return (
    <StyledBanner>
      <InnerContainer>
        <ImageContainer>
          <Image src={a1} alt="illustratro" />
        </ImageContainer>
        <TitleContainer>
          <div className="slogan">협업을 위한 새로운 선택</div>
          <div className="title">Tooliv</div>
        </TitleContainer>
        <FunctionContainer>
          <ButtonContainer>
            <Button onClick={onDownload}>
              <Download width={16} /> COMMUNITY 다운로드
            </Button>
            <Button>
              <Download width={16} />
              ENTERPRISE 다운로드
            </Button>
          </ButtonContainer>
          <WebShortcutsContainer onClick={shortcutsWeb}>
            <Rightarrow width={16} fill={"#ffffff"} /> 웹에서 Tooliv 이용하기
          </WebShortcutsContainer>
        </FunctionContainer>
      </InnerContainer>
    </StyledBanner>
  );
};

export default Banner;
