import styled from "@emotion/styled";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import a1 from "/public/assets/images/a1.png";
import Wavy from "/public/assets/images/Wavy.png";

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

const ButtonContainer = styled.div`
  display: flex;
  gap: 30px;
  justify-content: center;
  z-index: 1;
`;

const Button = styled.button`
  width: 200px;
  height: 40px;
  background-color: white;
  border: none;
  border-radius: 45px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
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

const Banner = () => {
  const nav = useRouter();

  const onDownload = () => {
    nav.push(
      "https://tooliva402.s3.ap-northeast-2.amazonaws.com/tooliv-win32-ia32.zip"
    );
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
        <ButtonContainer>
          <Button onClick={onDownload}>window용 다운로드</Button>
          <Button>mac용 다운로드</Button>
        </ButtonContainer>
      </InnerContainer>
    </StyledBanner>
  );
};

export default Banner;
