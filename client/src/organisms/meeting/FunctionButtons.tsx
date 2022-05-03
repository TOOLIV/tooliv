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

  // const onhandleMoniter = () => {
  //   if (shareMoniter) {
  //     publisher.vi
  //   }
  // }

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
      <FunctionButton icon="shareMonitor" onClick={() => {}} />
      <FunctionButton icon="exit" exit onClick={() => {}} />
    </FucntionButtonsContainer>
  );
};

export default FunctionButtons;
