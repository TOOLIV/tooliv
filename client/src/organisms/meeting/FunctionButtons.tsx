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
  setIsScreenShareModal,
}: funcButtonPropsTypes) => {
  const [audio, setAudio] = useState(true);
  const [video, setVideo] = useState(true);
  const [shareMoniter, setShareMoniter] = useState(false);

  const onhandleAudio = () => {
    if (!publisher) return;
    if (audio) {
      publisher.publishAudio(false);
      setAudio(false);
    } else {
      publisher.publishAudio(true);
      setAudio(true);
    }
  };
  const onhandleVideo = () => {
    if (!publisher) return;
    if (video) {
      publisher.publishVideo(false);
      setVideo(false);
    } else {
      publisher.publishVideo(true);
      setVideo(true);
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
        icon={audio ? 'audioOn' : 'audioOff'}
        onClick={onhandleAudio}
      />
      <FunctionButton
        icon={video ? 'videoOn' : 'videoOff'}
        onClick={onhandleVideo}
      />
      <FunctionButton
        icon="shareMonitor"
        onClick={() => setIsScreenShareModal(true)}
      />
      <FunctionButton icon="exit" exit onClick={() => {}} />
    </FucntionButtonsContainer>
  );
};

export default FunctionButtons;
