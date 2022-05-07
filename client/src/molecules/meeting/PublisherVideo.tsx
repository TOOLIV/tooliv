import styled from '@emotion/styled';
import React, { useEffect, useRef } from 'react';
import { colors } from 'shared/color';
import { publisherVideoPropsType } from 'types/meeting/openviduTypes';

export const VideoContainer = styled.div<{rowCnt:number, colCnt:number, isScreenSharing:boolean}>`
  width: ${props => props.isScreenSharing? '20vh' : 'calc(100% / '+ props.rowCnt + ' - '+ (props.rowCnt-1)*4 +'px)'};
  height: ${props => props.isScreenSharing? '15vh' : 'calc(100% / '+ props.colCnt + ' - '+ (props.colCnt-1)*4 +'px)'};
  border-radius: 10px;
  background-color: ${colors.black};
`;

export const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  
`;

const PublisherVideo = ({ publisher, colCnt, rowCnt, isScreenSharing }: publisherVideoPropsType) => {
  const publisherVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (publisherVideoRef.current) {
      publisher.addVideoElement(publisherVideoRef.current);
    }
  }, [publisher]);

  return (
    <VideoContainer rowCnt={rowCnt} colCnt={colCnt} isScreenSharing={isScreenSharing}>
      <StyledVideo
        ref={publisherVideoRef}
        autoPlay
        className={JSON.parse(publisher.stream.connection.data).clientData}
      />
    </VideoContainer>
  );
};

export default PublisherVideo;
