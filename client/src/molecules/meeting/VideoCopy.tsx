import styled from '@emotion/styled';
import { Publisher, StreamManager } from 'openvidu-browser';
import React, { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { isOpenChat, isOpenSide } from 'recoil/atom';
import { colors } from 'shared/color';
import { videoTypes } from '../../types/meeting/openviduTypes';

const VideoConatianer = styled.div`
  background-color: ${colors.black};
  border-radius: 10px;
`;

const StyeldVideo = styled.video`
  width: 300px;
  height: 200px;
`;

const InActiveVideo = styled.div`
  display: flex;
  font-size: 20px;
  font-weight: 700;
  color: ${colors.white};
  width: 300px;
  height: 200px;
  justify-content: center;
  align-items: center;
`;

type VideoCopyProps = {
  publisher?: Publisher | undefined;
  subscribe?: StreamManager | undefined;
};

const VideoCopy = ({ publisher, subscribe }: VideoCopyProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    console.log(publisher, subscribe);
    if (publisher && videoRef.current) {
      publisher.addVideoElement(videoRef.current);
    } else if (subscribe && videoRef.current) {
      subscribe.addVideoElement(videoRef.current);
    }
    // return () => {
    //   subscribe?.removeAllVideos();
    // };
  }, [publisher, subscribe]);

  useEffect(() => {}, []);

  if (!publisher && !subscribe) return <></>;

  return (
    <VideoConatianer>
      {publisher && !publisher.stream.videoActive && (
        <InActiveVideo>
          {JSON.parse(publisher.stream.connection.data).clientData}
        </InActiveVideo>
      )}
      <StyeldVideo
        ref={videoRef}
        autoPlay={true}
        className={
          publisher
            ? JSON.parse(publisher.stream.connection.data).clientData
            : subscribe
            ? JSON.parse(subscribe.stream.connection.data).clientData
            : ''
        }
      />
      {/* <button onClick={stopVideo} /> */}
    </VideoConatianer>
  );
};

export default VideoCopy;
