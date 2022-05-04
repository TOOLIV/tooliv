import styled from '@emotion/styled';
import React, { useState } from 'react';
import FunctionButton from '../../molecules/meeting/FunctionButton';
import { funcButtonPropsTypes } from '../../types/meeting/openviduTypes';

const FucntionButtonsContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
`;

const FunctionButtons = ({
  publisher,
  isAudioOn,
  setIsAudioOn,
  isVideoOn,
  setIsVideoOn,
  isScreenSharing,
  setIsScreenSharing,
  leaveSession,
}: // setIsScreenShareModal,
funcButtonPropsTypes) => {
  const [shareMoniter, setShareMoniter] = useState(false);

  const onhandleAudio = () => {
    if (!publisher) return;
    if (isAudioOn) {
      publisher.publishAudio(false);
      setIsAudioOn(false);
    } else {
      publisher.publishAudio(true);
      setIsAudioOn(true);
    }
  };
  const onhandleVideo = () => {
    if (!publisher) return;
    if (isVideoOn) {
      publisher.publishVideo(false);
      console.log(publisher);
      setIsVideoOn(false);
    } else {
      publisher.publishVideo(true);
      console.log(publisher);
      setIsVideoOn(true);
    }
  };

  const onhandleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
  };

  const onleaveSession = () => {
    leaveSession();
  };

  return (
    <FucntionButtonsContainer>
      <FunctionButton
        icon={isAudioOn ? 'audioOn' : 'audioOff'}
        onClick={onhandleAudio}
      />
      <FunctionButton
        icon={isVideoOn ? 'videoOn' : 'videoOff'}
        onClick={onhandleVideo}
      />
      <FunctionButton icon="shareMonitor" onClick={onhandleScreenShare} />
      <FunctionButton icon="exit" exit onClick={onleaveSession} />
    </FucntionButtonsContainer>
  );
};

export default FunctionButtons;
