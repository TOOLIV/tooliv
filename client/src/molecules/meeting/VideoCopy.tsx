import styled from '@emotion/styled';
import isElectron from 'is-electron';
import { Publisher, StreamManager } from 'openvidu-browser';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { isOpenChat, isOpenSide } from 'recoil/atom';
import { colors } from 'shared/color';

const VideoConatianer = styled.div<{
  width: number;
  height: number;
  isScreen: boolean;
}>`
  background-color: ${colors.black};
  border-radius: 10px;
  width: calc(
    (100% / ${(props) => props.width}) - (${(props) => props.width} - 1) * 3px
  );
  max-width: ${(props) => (props.isScreen ? '200px' : '600px')};
  height: calc(
    (100% / ${(props) => props.height}) - (${(props) => props.height} - 1) * 3px
  );
  min-width: 200px;
  max-height: ${(props) =>
    props.isScreen
      ? '150px'
      : props.width === 1
      ? '400px'
      : props.width === 2
      ? '400px'
      : '300px'};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyeldVideo = styled.video<{ width: number; height: number }>`
  /* width: calc(100% / ${(props) => props.width});
  height: calc(100% / ${(props) => props.height}); */
  width: 100%;
  height: 100%;
  max-height: 400px;
  border-radius: 10px;
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
  totalUser: number;
  isScreen?: boolean;
};

const VideoCopy = ({
  publisher,
  subscribe,
  totalUser,
  isScreen,
}: VideoCopyProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isOpen = useRecoilValue(isOpenSide);
  const isChat = useRecoilValue(isOpenChat);
  const [width, setWidth] = useState<number>(1);
  const [height, setHeight] = useState<number>(1);

  useEffect(() => {
    console.log(totalUser);

    const temp =
      !isOpen && !isChat && totalUser > 4
        ? 3
        : !isOpen && !isChat && totalUser > 1
        ? 2
        : !isOpen && !isChat && totalUser === 1
        ? 1
        : isOpen && isChat && totalUser > 2
        ? 2
        : isOpen && isChat && totalUser > 0
        ? 1
        : (isOpen || isChat) && totalUser > 4
        ? 3
        : (isOpen || isChat) && totalUser > 2
        ? 2
        : 1;
    setWidth(temp);
    setHeight(Math.ceil(totalUser / temp));
    console.log(width, height);
  }, [totalUser, isChat, isOpen]);

  useEffect(() => {
    console.log(publisher, subscribe);
    if (publisher && videoRef.current) {
      publisher.addVideoElement(videoRef.current);
    } else if (subscribe && videoRef.current) {
      subscribe.addVideoElement(videoRef.current);
    }
  }, [publisher, subscribe]);

  if (!publisher && !subscribe) return <></>;

  return (
    <VideoConatianer
      width={width}
      height={height}
      isScreen={isScreen ? isScreen : false}
    >
      {/* {publisher && !publisher.stream.videoActive && (
        <InActiveVideo>
          {JSON.parse(publisher.stream.connection.data).clientData}
        </InActiveVideo>
      )} */}
      <StyeldVideo
        width={width}
        height={height}
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
    </VideoConatianer>
  );
};

export default VideoCopy;
