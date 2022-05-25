import styled from "@emotion/styled";
import Head from "next/head";
import Image from "next/image";
import Banner, { BannerPropsType } from "../components/Banner";
import Content, { DescriptionType } from "../components/Content";
const contexts = require("/data/context.ts");

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

const Home = ({ OS, header }: BannerPropsType) => {
  return (
    <>
      <Head>
        <title>Tooliv | Home</title>
      </Head>
      <Container>
        <Banner OS={OS} header={header} />
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
              link={data.link}
            />
          ))}
        </Contents>
      </Container>
    </>
  );
};

export const getServerSideProps = ({ req }: any) => {
  let OS = "";
  if (req.headers["user-agent"].indexOf("Win") != -1) OS = "Windows";
  if (req.headers["user-agent"].indexOf("Mac") != -1) OS = "MacOS";
  if (req.headers["user-agent"].indexOf("X11") != -1) OS = "UNIX";
  if (req.headers["user-agent"].indexOf("Linux") != -1) OS = "Linux";
  return { props: { OS, header: req.headers } };
};

export default Home;
