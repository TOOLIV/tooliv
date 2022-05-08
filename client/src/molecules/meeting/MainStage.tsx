import styled from '@emotion/styled';
import { StreamManager } from 'openvidu-browser';
import React, { useEffect, useRef, useState } from 'react';
import { colors } from 'shared/color';
import UserLabel from './UserLabel';

const MainStateContainer = styled.div`
  width: 100%;
  height: calc(85vh - 258px);
  border-radius: 10px;
  background-color: ${colors.black};
  position: relative;
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
  const [visiableLable, setVisiableLabel] = useState<boolean>(false);

  useEffect(() => {
    if (videoRef.current) streamManager.addVideoElement(videoRef.current);
  }, [streamManager]);

  return (
    <MainStateContainer
      onMouseEnter={() => setVisiableLabel(true)}
      onMouseLeave={() => setVisiableLabel(false)}
    >
      <StyledVideo
        ref={videoRef}
        autoPlay={true}
        className={JSON.parse(streamManager.stream.connection.data).clientData}
      />
      {visiableLable && (
        <UserLabel
          userName={JSON.parse(streamManager.stream.connection.data).clientData}
        />
      )}
    </MainStateContainer>
  );
};

export default MainStage;
