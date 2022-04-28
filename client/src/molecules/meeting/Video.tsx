import styled from '@emotion/styled';
import React, { useEffect, useRef } from 'react';
import { videoTypes } from '../../types/meeting/openviduTypes';

const StyeldVideo = styled.video`
  width: 200px;
  height: 150px;
`;

const Video = ({ publisher, subscribers }: videoTypes) => {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (publisher && !!video.current) {
      console.log('mainStreamManager>>>>>>>', publisher);

      publisher.addVideoElement(video.current);
    } else if (subscribers && !!video.current) {
      console.log('streamManager>>>>>>>>>>>>>>>>>>>>>');
      console.log(JSON.parse(subscribers.stream.connection.data).clientData);
      subscribers.addVideoElement(video.current);
      // openviduState?.session.
    }
  }, []);

  return (
    <StyeldVideo
      autoPlay={true}
      ref={video}
      className={
        publisher
          ? JSON.parse(publisher.stream.connection.data).clientData
          : subscribers &&
            JSON.parse(subscribers.stream.connection.data).clientData
      }
    ></StyeldVideo>
  );
};

export default Video;
