import React, { useEffect, useRef } from 'react';
import { subscriberVideoPropsType } from 'types/meeting/openviduTypes';
import { StyledVideo, VideoContainer } from './PublisherVideo';

const SubscriberVideo = ({ subscriber, colCnt, rowCnt, isScreenSharing }: subscriberVideoPropsType) => {
  const subscriberVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (subscriberVideoRef.current) {
      subscriber.addVideoElement(subscriberVideoRef.current);
    }
  }, [subscriber]);
  return (
    <VideoContainer rowCnt={rowCnt} colCnt={colCnt} isScreenSharing={isScreenSharing}>
      <StyledVideo
        ref={subscriberVideoRef}
        autoPlay
        className={JSON.parse(subscriber.stream.connection.data).clientData}
      />
    </VideoContainer>
  );
};

export default SubscriberVideo;
