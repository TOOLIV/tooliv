import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  doScreenSharing,
  setDoStartScreenSharing,
  setDoStopScreenSharing,
}: 
funcButtonPropsTypes) => {

  const param = useParams();
  const navigate = useNavigate();

  const onhandleAudio = () => {
    if (isAudioOn) {
      publisher.publishAudio(false);
      setIsAudioOn(false);
    } else {
      publisher.publishAudio(true);
      setIsAudioOn(true);
    }
  };
  const onhandleVideo = () => {
    if (isVideoOn) {
      publisher.publishVideo(false);
      setIsVideoOn(false);
    } else {
      publisher.publishVideo(true);
      setIsVideoOn(true);
    }
  };

  const onhandleScreenShare = () => {
    if (doScreenSharing) {
      setDoStopScreenSharing(true);
    } else {
      setDoStartScreenSharing(true);
    }
  };

  const onleaveSession = () => {
    navigate(`/${param.workspaceId}/${param.channelId}`)
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
