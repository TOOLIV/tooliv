import styled from '@emotion/styled';
import isElectron from 'is-electron';
import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { electronAlert } from 'utils/electronAlert';
import FunctionButton from '../../molecules/meeting/FunctionButton';
import { funcButtonPropsTypes } from '../../types/meeting/openviduTypes';
import { BulrContainer } from './video/ScreenShareModal';

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
}: funcButtonPropsTypes) => {
  const param = useParams();
  const navigate = useNavigate();
  const [isBlur, setIsBulr] = useState(false);
  const location = useLocation();

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
    setIsBulr(true);
    isElectron()
      ? electronAlert
          .alertConfirm({
            title: '현재 미팅에 참여중입니다.',
            text: '참여중인 미팅을 나가시겠습니까?',
            icon: 'warning',
          })
          .then((result) => {
            if (result.isConfirmed) {
              navigate(`/${param.workspaceId}/${param.channelId}`);
            }
            setIsBulr(false);
          }) /* -------------------------  */
      : /* 여기에 웹에서 쓸 alert 넣어주세요 */
        console.log('');

    /* -------------------------  */
  };

  return (
    <FucntionButtonsContainer>
      {isBlur && <BulrContainer />}
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
