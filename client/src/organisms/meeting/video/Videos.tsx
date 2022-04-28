import styled from '@emotion/styled';
import axios from 'axios';
import { OpenVidu, Session, StreamManager } from 'openvidu-browser';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import Video from '../../../molecules/meeting/Video';
import { isOpenChat } from '../../../recoil/atom';
import {
  openviduTypes,
  videosTypes,
  videoTypes,
} from '../../../types/meeting/openviduTypes';

const VideoContainer = styled.div<{ isChatOpen: boolean }>`
  display: flex;
  flex-wrap: wrap;
  place-items: center;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: inherit;
  height: calc(100vh - 210px);
  /* background-color: #121212; */
`;

// const Video = styled.div`
//   width: 10vw;
//   height: 10vh;
//   background-color: black;
//   border-radius: 10px;
// `;

const Videos = ({ publisher, subscribers }: videosTypes) => {
  const isChatOpen = useRecoilValue(isOpenChat);

  return (
    <div>
      <VideoContainer isChatOpen={isChatOpen}>
        <Video publisher={publisher} />
        {subscribers &&
          subscribers.map((sub: StreamManager, i: number) => (
            <Video subscribers={sub} key={i} />
          ))}
        {/* <Video />
        <Video />
        <Video /> */}
      </VideoContainer>
      {/* <button onClick={leaveSession} /> */}
    </div>
  );
};

export default Videos;
