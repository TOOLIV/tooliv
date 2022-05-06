import styled from '@emotion/styled';
import axios from 'axios';
import { OpenVidu, Session, StreamManager } from 'openvidu-browser';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import Video from '../../../molecules/meeting/Video';
import { isOpenChat } from '../../../recoil/atom';
import { videosTypes } from '../../../types/meeting/openviduTypes';

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
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 0px;
  }
`;

const Videos = ({ publisher, subscribers }: videosTypes) => {
  const isChatOpen = useRecoilValue(isOpenChat);
  if (!subscribers) return <></>;
  const totalUser = subscribers?.length + 1;

  return (
    <div>
      <VideoContainer isChatOpen={isChatOpen}>
        <Video publisher={publisher} totalUser={totalUser} />
        {subscribers &&
          subscribers.map((sub: StreamManager, i: number) => (
            <Video subscribers={sub} key={i} totalUser={totalUser} />
          ))}
      </VideoContainer>
    </div>
  );
};

export default Videos;
