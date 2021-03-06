import { Head, Html, Main, NextScript } from "next/document";
import React from "react";

const MyDocument = () => {
  return (
    <Html lang="ko">
      <Head>
        <title>Tooliv</title>
        <meta property="og:tpye" content="website" />
        <meta property="og:url" content="https://tooliv.io" />
        <meta property="og:site_name" content="Tooliv" />
        <meta
          property="og:image"
          content="http://tooliv.io//_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fthumbnail.0f144253.png&w=3840&q=75"
        />
        <meta
          property="og:keywords"
          content="Tooliv, voice chat, free voice chat, video chat, free video chat, meeting, conference, 화상회의, 협업툴, 음성채팅, 화상채팅, 회의"
        />
        <meta
          name="google-site-verification"
          content="70Z-aBYB2DutRuo4QIMBWf0V_zsGRM_nkRar9d-GyME"
        />
        <meta property="og:locale" content="en_US, ko" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" data-react-helmet="true" />
        <meta
          property="og:description"
          content="팀 만의 작업공간을 만들어 소통해 보세요.Tooliv에는 팀 만의 작업 공간을 만들어 업무를 진행할 수 있습니다.워크스페이스 내에서 그룹별로 새로운 채널을 개설하여 대화와 화상 미팅을 할 수 있습니다.여러분의 공간에서 업무 효율을 높여보세요.채팅을 통해 팀원들고 대화하세요.채널에 참여한 팀 구성원과 대화를 나눌 수 있습니다.협업에 필요한 다양한 자료를 빠르게 공유하여 업무 효율을 높여보세요.마크다운으로 다양한 스타일로 대화를 나눠보세요.미팅 룸으로 이동해 화상회의를 진행해보세요.미팅 룸에서는 화상회의를 할 수 있습니다.팀 원들과 마주보며 소통하여 업무에 집중력을 높여보세요공유 해야하는 내용이 있다면 화면 공유를 이용해보세요"
        />
        <meta
          name="description"
          content="팀 만의 작업공간을 만들어 소통해 보세요.Tooliv에는 팀 만의 작업 공간을 만들어 업무를 진행할 수 있습니다.워크스페이스 내에서 그룹별로 새로운 채널을 개설하여 대화와 화상 미팅을 할 수 있습니다.여러분의 공간에서 업무 효율을 높여보세요.채팅을 통해 팀원들고 대화하세요.채널에 참여한 팀 구성원과 대화를 나눌 수 있습니다.협업에 필요한 다양한 자료를 빠르게 공유하여 업무 효율을 높여보세요.마크다운으로 다양한 스타일로 대화를 나눠보세요.미팅 룸으로 이동해 화상회의를 진행해보세요.미팅 룸에서는 화상회의를 할 수 있습니다.팀 원들과 마주보며 소통하여 업무에 집중력을 높여보세요공유 해야하는 내용이 있다면 화면 공유를 이용해보세요"
        />
        <link
          href="https://cdn.jsdelivr.net/gh/sunn-us/SUIT/fonts/static/woff2/SUIT.css"
          rel="stylesheet"
        ></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default MyDocument;
