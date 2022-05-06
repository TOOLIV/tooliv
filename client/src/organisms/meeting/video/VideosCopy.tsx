import styled from '@emotion/styled';
import axios from 'axios';
import VideoCopy from 'molecules/meeting/VideoCopy';
import { OpenVidu, Session, StreamManager } from 'openvidu-browser';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import Video from '../../../molecules/meeting/Video';
import { isOpenChat } from '../../../recoil/atom';
import { videosTypes } from '../../../types/meeting/openviduTypes';

const VideoContainer = styled.div<{ isChatOpen: boolean; isScreen: boolean }>`
  display: flex;
  flex-wrap: ${(props) => (props.isScreen ? '' : 'wrap')};
  place-items: center;
  justify-content: ${(props) => (props.isScreen ? '' : 'center')};
  align-items: center;
  gap: 3px;
  width: inherit;
  height: ${(props) => (props.isScreen ? 'auto' : 'inherit')};
  /* background-color: #121212; */
  overflow-y: scroll;
`;

const VideosCopy = ({ publisher, subscribers, isScreen }: videosTypes) => {
  const isChatOpen = useRecoilValue(isOpenChat);

  if (!publisher && (!subscribers || subscribers.length === 0)) return <></>;
  const totalUser = subscribers ? subscribers.length + 1 : 1;

  return (
    <VideoContainer
      isChatOpen={isChatOpen}
      id="videoContainer"
      isScreen={isScreen}
    >
      {publisher && (
        <VideoCopy
          publisher={publisher}
          totalUser={totalUser}
          isScreen={isScreen}
        />
      )}
      {subscribers &&
        subscribers.map((sub: StreamManager, i: number) => (
          <VideoCopy
            subscribe={sub}
            key={i}
            totalUser={totalUser}
            isScreen={isScreen}
          />
        ))}
    </VideoContainer>
  );
};

export default VideosCopy;
