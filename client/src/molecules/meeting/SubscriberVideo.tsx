import React, { useEffect, useRef, useState } from 'react';
import { subscriberVideoPropsType } from 'types/meeting/openviduTypes';
import { StyledVideo, VideoContainer } from './PublisherVideo';
import UserLabel from './UserLabel';

const SubscriberVideo = ({
  subscriber,
  colCnt,
  rowCnt,
  isScreenSharing,
}: subscriberVideoPropsType) => {
  const subscriberVideoRef = useRef<HTMLVideoElement>(null);
  const [visiableLable, setVisiableLabel] = useState<boolean>(false);

  useEffect(() => {
    if (subscriberVideoRef.current) {
      subscriber.addVideoElement(subscriberVideoRef.current);
    }
  }, [subscriber]);
  return (
    <VideoContainer
      rowCnt={rowCnt}
      colCnt={colCnt}
      isScreenSharing={isScreenSharing}
      onMouseEnter={() => setVisiableLabel(true)}
      onMouseLeave={() => setVisiableLabel(false)}
    >
      <StyledVideo
        ref={subscriberVideoRef}
        autoPlay
        className={JSON.parse(subscriber.stream.connection.data).clientData}
      />
      {visiableLable && (
        <UserLabel
          userName={JSON.parse(subscriber.stream.connection.data).clientData}
        />
      )}
    </VideoContainer>
  );
};

export default SubscriberVideo;
