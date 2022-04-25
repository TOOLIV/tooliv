import styled from '@emotion/styled';
import React, { useEffect, useRef } from 'react';
import { videoTypes } from '../../types/meeting/openviduTypes';

const StyeldVideo = styled.video`
  width: 600px;
  height: 300px;
`;

const Video = ({ openviduState }: videoTypes) => {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (openviduState.mainStreamManager && !!video.current) {
      console.log('mainStreamManager>>>>>>>', openviduState.mainStreamManager);

      openviduState.mainStreamManager.addVideoElement(video.current);
    }
  });

  return (
    <StyeldVideo
      autoPlay={true}
      ref={video}
      className={openviduState.myUserName}
    ></StyeldVideo>
  );
};

export default Video;
