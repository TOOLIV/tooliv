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
  height: 100%;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const FooterContainer = styled.div`
  width: 70vw;
  display: flex;
  padding-bottom: 24.16px;
  @media screen and (max-width: 950px) {
    padding-left: 2rem;
    width: 100%;
  }
`;

const Intro = styled.div`
  width: 50vw;
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
    padding-left: 10px;
    .desc {
      height: 20px;
      display: flex;
      gap: 4px;
      align-items: center;
      font-weight: 500;
      font-size: 14px;
    }
  }
  @media screen and (max-width: 950px) {
    width: 100%;
  }
`;

const Menu = styled.div`
  width: 20vw;
  display: flex;
  justify-content: space-between;
  padding-top: 24.16px;
`;

const SubMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  .title {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 12px;
    cursor: pointer;
  }
  .item {
    font-size: 12px;
    cursor: pointer;
  }
`;

const Footer = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 950px)" });
  return (
    <StyledFooter>
      <FooterContainer>
        <Intro>
          <div style={{ width: "200px", height: "100px" }}>
            <Image src={Thumbnail} objectFit="cover" />
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
            <div>
              <SubMenu>
                <div className="title">DOWNLOAD</div>
                <div className="item">COMMUNITY 다운로드</div>
                <div className="item">ENTERPRISE 다운로드</div>
              </SubMenu>
            </div>
            <div>
              <SubMenu>
                <div className="title">DOCS</div>
              </SubMenu>
            </div>
          </Menu>
        )}
      </FooterContainer>
    </StyledFooter>
  );
};

export default Footer;
