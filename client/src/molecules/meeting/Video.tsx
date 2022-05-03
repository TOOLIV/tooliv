import styled from '@emotion/styled';
import React, { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { isOpenChat, isOpenSide } from 'recoil/atom';
import { colors } from 'shared/color';
import { videoTypes } from '../../types/meeting/openviduTypes';

const VideoConatianer = styled.div<{ perRow: number }>`
  width: calc(
    (100% / ${(props) => props.perRow}) - (10px * ${(props) => props.perRow})
  );
  height: calc((100% / ${(props) => props.perRow}) - 10px);
  max-height: calc(
    (
      (100% / ${(props) => props.perRow - 1}) -
        (10px * ${(props) => props.perRow - 1})
    )
  );
  background-color: ${colors.black};
`;

const StyeldVideo = styled.video`
  width: 100%;
  height: 100%;
`;

const Video = ({ publisher, subscribers, totalUser }: videoTypes) => {
  const video = useRef<HTMLVideoElement>(null);
  const isOpen = useRecoilValue<boolean>(isOpenSide);
  const isChatOpen = useRecoilValue<boolean>(isOpenChat);
  const perRow =
    totalUser <= 1
      ? 1
      : isOpen && isChatOpen && totalUser > 1
      ? 2
      : (isOpen || isChatOpen) && totalUser > 4
      ? 3
      : (isOpen || isChatOpen) && totalUser < 4
      ? 2
      : !isOpen && !isChatOpen && totalUser < 4
      ? totalUser
      : 3;
  const perCol =
    totalUser <= 1
      ? 1
      : isOpen && isChatOpen && totalUser > 1
      ? 2
      : (isOpen || isChatOpen) && totalUser > 4
      ? 3
      : !isOpen && !isChatOpen && totalUser < 4
      ? totalUser
      : 3;

  console.log(publisher);
  useEffect(() => {
    if (publisher && !!video.current) {
      console.log('mainStreamManager>>>>>>>', publisher);

      publisher.addVideoElement(video.current);
    } else if (subscribers && !!video.current) {
      console.log('streamManager>>>>>>>>>>>>>>>>>>>>>');
      console.log(JSON.parse(subscribers.stream.connection.data).clientData);
      console.log(subscribers);
      console.log(video.current);
      subscribers.addVideoElement(video.current);
      // openviduState?.session.
    }
  }, []);

  return (
    <VideoConatianer perRow={perRow}>
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
    </VideoConatianer>
  );
};

export default Video;
