import styled from "@emotion/styled";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import React from "react";
import { useMediaQuery } from "react-responsive";

const StyledContent = styled.div<{ c: number }>`
  display: flex;
  justify-content: center;
  gap: 30px;
  width: 100%;
  @media screen and (max-width: 768px) {
    height: 600px;
  }
  background-color: ${(props) => (props.c % 2 === 0 ? "#f8f8f8" : "")};
`;

const InnerContainer = styled.div`
  display: flex;
  height: 440px;
  align-items: center;
  width: 100%;
  @media screen and (min-width: 1280px) {
    width: 70vw;
  }
  @media screen and (max-width: 1280px) {
    width: 100%;
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

const DescImageContainer = styled.div`
  display: flex;
  position: relative;
  width: 60%;
  height: 100%;
  @media screen and (max-width: 768px) {
    width: 100%;
    min-height: 380px;
    height: 60%;
    justify-content: center;
  }
`;

const MainContainer = styled.div`
  position: absolute;
`;

const MotionImage = styled(motion.div)`
  position: absolute;
`;

const Desc = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 50%;
  padding: 0 30px;
  .title {
    font-size: 20px;
    font-weight: 700;
  }
  .desc {
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-size: 16px;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export type DescriptionType = {
  id: number;
  title: string;
  description: Array<string>;
  mainImage: StaticImageData;
  imoImage: StaticImageData;
  subImage: StaticImageData;
};

const Content = ({
  id,
  title,
  mainImage,
  imoImage,
  subImage,
  description,
}: DescriptionType) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTabletOrLaptop = useMediaQuery({ query: "(min-width: 768px)" });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  return (
    <StyledContent c={id}>
      <InnerContainer>
        {id % 2 === 0 && !isTabletOrMobile && (
          <Desc>
            <div className="title">{title}</div>
            <div className="desc">
              {description.map((desc, idx) => (
                <div key={idx}>{desc}</div>
              ))}
            </div>
          </Desc>
        )}
        <DescImageContainer>
          <MainContainer
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Image
              src={mainImage}
              objectFit="contain"
              height="400px"
              width="500px"
              alt="mainImage"
            />
          </MainContainer>
          <MotionImage
            initial={{
              x: 0,
              // id % 2 === 0 && isDesktopOrLaptop
              //   ? "200%"
              //   : id % 2 === 0 && isTabletOrLaptop
              //   ? "200%"
              //   : 0,
              scale: 0,
            }}
            whileInView={{
              x: 0,
              // id % 2 === 0 && isDesktopOrLaptop
              //   ? "200%"
              //   : id % 2 === 0 && isTabletOrLaptop
              //   ? "200%"
              //   : 0,
              scale: 1,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            style={{
              bottom: 0,
              left: 0,
            }}
          >
            <Image
              src={subImage}
              objectFit="contain"
              height="200px"
              width="250px"
              alt="subImage"
            />
          </MotionImage>
          <MotionImage
            initial={{ y: 0, scale: 0 }}
            whileInView={{ y: "20%", scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            style={{ top: 0, left: "10%" }}
          >
            <Image
              src={imoImage}
              objectFit="contain"
              height="130px"
              width="130px"
              alt="imoImage"
            />
          </MotionImage>
        </DescImageContainer>
        {(id % 2 !== 0 || isTabletOrMobile) && (
          <Desc>
            <div className="title">{title}</div>
            <div className="desc">
              {description.map((desc, idx) => (
                <div key={idx}>{desc}</div>
              ))}
            </div>
          </Desc>
        )}
      </InnerContainer>
    </StyledContent>
  );
};

export default Content;
