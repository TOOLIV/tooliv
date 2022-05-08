import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';
import { colors } from 'shared/color';
import { publisherVideoPropsType } from 'types/meeting/openviduTypes';
import UserLabel from './UserLabel';

export const VideoContainer = styled.div<{
  rowCnt: number;
  colCnt: number;
  isScreenSharing: boolean;
  isSpeak: boolean;
}>`
  width: ${(props) =>
    props.isScreenSharing
      ? '20vh'
      : 'calc(100% / ' + props.rowCnt + ' - ' + (props.rowCnt - 1) * 4 + 'px)'};
  height: ${(props) =>
    props.isScreenSharing
      ? 'calc(15vh - 6px)'
      : 'calc(100% / ' + props.colCnt + ' - ' + (props.colCnt - 1) * 4 + 'px)'};
  border-radius: 10px;
  background-color: ${colors.gray900};
  min-width: 20vh;
  position: relative;
  border: ${(props) =>
    props.isSpeak ? `3px solid ${colors.primary}` : 'none'};
`;

export const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
`;

const PublisherVideo = ({
  publisher,
  colCnt,
  rowCnt,
  isScreenSharing,
  isSpeak,
}: publisherVideoPropsType) => {
  const publisherVideoRef = useRef<HTMLVideoElement>(null);
  const [visiableLable, setVisiableLabel] = useState<boolean>(false);

  useEffect(() => {
    if (publisherVideoRef.current) {
      publisher.addVideoElement(publisherVideoRef.current);
    }
  }, [publisher]);

  return (
    <VideoContainer
      rowCnt={rowCnt}
      colCnt={colCnt}
      isScreenSharing={isScreenSharing}
      onMouseEnter={() => setVisiableLabel(true)}
      onMouseLeave={() => setVisiableLabel(false)}
      isSpeak={isSpeak}
    >
      <StyledVideo
        ref={publisherVideoRef}
        autoPlay
        className={JSON.parse(publisher.stream.connection.data).clientData}
      />
      {visiableLable && (
        <UserLabel
          userName={JSON.parse(publisher.stream.connection.data).clientData}
        />
      )}
    </VideoContainer>
  );
};

export default PublisherVideo;
