import styled from "@emotion/styled";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";
import Banner from "../components/Banner";
import Content, { DescriptionType } from "../components/Content";
const contexts = require("/data/context.ts");

console.log(contexts.contexts);
const Container = styled.div`
  min-height: calc(100vh - 84px);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const Home = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

  return (
    <Container>
      <Banner />
      <Contents>
        {contexts.contexts.map((data: DescriptionType) => (
          <Content
            key={data.id}
            id={data.id}
            mainImage={data.mainImage}
            imoImage={data.imoImage}
            subImage={data.subImage}
            description={data.description}
            title={data.title}
          />
        ))}
      </Contents>
    </Container>
  );
};

export default Home;

