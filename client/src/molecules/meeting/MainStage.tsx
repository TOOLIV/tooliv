import styled from '@emotion/styled';
import { StreamManager } from 'openvidu-browser';
import React, { useEffect, useRef } from 'react';
import { colors } from 'shared/color';

const MainStateContainer = styled.div`
  margin-top: 3px;
  width: 100%;
  height: 70%;
  border-radius: 10px;
  background-color: ${colors.black};
`;
const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

type MainStagePropsType = {
  streamManager: StreamManager;
};

const MainStage = ({ streamManager }: MainStagePropsType) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    console.log("streamManager>>>>>>>>>>>>>>>>>>>>>>>", streamManager);
    if (videoRef.current) streamManager.addVideoElement(videoRef.current);
  }, [streamManager]);

  return (
    <MainStateContainer>
      <StyledVideo
        ref={videoRef}
        autoPlay={true}
        className={JSON.parse(streamManager.stream.connection.data).clientData}
      ></StyledVideo>
    </MainStateContainer>
  );
};

export default MainStage;
