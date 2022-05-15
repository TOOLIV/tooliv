import styled from "@emotion/styled";
import React from "react";
import Github from "/public/assets/images/github.svg";
import Email from "/public/assets/images/email.svg";
import Tel from "/public/assets/images/tel.svg";
import { useMediaQuery } from "react-responsive";
import Thumbnail from "/public/assets/images/thumbnail.png";
import Image from "next/image";

const StyledFooter = styled.footer`
  background-color: #fce8e4;
  height: 15rem;
  display: flex;
  justify-content: center;
`;

const FooterContainer = styled.div`
  width: 70vw;
  display: flex;
  padding: 2.5rem 0;
`;

const Intro = styled.div`
  width: 40vw;
  display: flex;
  flex-direction: column;
  gap: 20px;
  .company {
    font-size: 2rem;
    font-weight: 700;
  }
  .description {
    display: flex;
    flex-direction: column;
    gap: 4px;
    .desc {
      height: 20px;
      display: flex;
      gap: 4px;
      align-items: center;
      font-weight: 500;
      font-size: 14px;
    }
  }
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Menu = styled.div`
  width: 30vw;
  display: flex;
  justify-content: space-between;
  font-weight: 700;

  div {
    cursor: pointer;
  }
`;

const Footer = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  return (
    <StyledFooter>
      <FooterContainer>
        <Intro>
          <div style={{ width: "200px" }}>
            <Image src={Thumbnail} objectFit="contain" />
          </div>
          <div className="description">
            <div className="desc">
              <Tel width="14" />
              Tel: 000-0000-0000
            </div>
            <div className="desc">
              <Email width="14" />
              Email: tooliv.a402@gmail.com
            </div>
            <div className="desc">
              <Github width="14" />
              Github: https://github.com/TOOLIV/tooliv
            </div>
          </div>
        </Intro>
        {!isTabletOrMobile && (
          <Menu>
            <div>다운로드</div>
            <div>설치형 가이드</div>
            <div>소개</div>
          </Menu>
        )}
      </FooterContainer>
    </StyledFooter>
  );
};

export default Footer;
