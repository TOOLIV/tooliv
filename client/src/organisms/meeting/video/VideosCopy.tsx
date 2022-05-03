import styled from '@emotion/styled';
import axios from 'axios';
import VideoCopy from 'molecules/meeting/VideoCopy';
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

  /* background-color: #121212; */
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 0px;
  }
`;

const VideosCopy = ({ publisher, subscribers }: videosTypes) => {
  const isChatOpen = useRecoilValue(isOpenChat);

  if (!publisher && (!subscribers || subscribers.length === 0)) return <></>;
  const totalUser = subscribers ? subscribers.length + 1 : 1;

  return (
    <div>
      <VideoContainer isChatOpen={isChatOpen}>
        {publisher && <VideoCopy publisher={publisher} />}
        {subscribers &&
          subscribers.map((sub: StreamManager, i: number) => (
            <VideoCopy subscribe={sub} key={i} />
          ))}
      </VideoContainer>
    </div>
  );
};

export default VideosCopy;
