import styled from '@emotion/styled';
import React, { useEffect, useRef } from 'react';
import { videoTypes } from '../../types/meeting/openviduTypes';

const StyeldVideo = styled.video`
  width: 200px;
  height: 150px;
`;

const Video = ({ openviduState, streamManager }: videoTypes) => {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (openviduState?.mainStreamManager && !!video.current) {
      console.log('mainStreamManager>>>>>>>', openviduState.mainStreamManager);

      openviduState.mainStreamManager.addVideoElement(video.current);
    } else if (streamManager && !!video.current) {
      console.log('streamManager>>>>>>>>>>>>>>>>>>>>>');
      console.log(JSON.parse(streamManager.stream.connection.data).clientData);
      streamManager.addVideoElement(video.current);
      // openviduState?.session.
    }
  }, []);

  return (
    <StyeldVideo
      autoPlay={true}
      ref={video}
      className={
        streamManager &&
        JSON.parse(streamManager.stream.connection.data).clientData
      }
    ></StyeldVideo>
  );
};

export default Video;
