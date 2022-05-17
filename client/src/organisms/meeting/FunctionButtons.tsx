import styled from '@emotion/styled';
import isElectron from 'is-electron';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FunctionButton from '../../molecules/meeting/FunctionButton';
import { funcButtonPropsTypes } from '../../types/meeting/openviduTypes';
import Swal from 'sweetalert2';
import { electronAlert } from 'utils/electronAlert';
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

  // 미팅 나가기 클릭시 이벤트
  const clickLeaveButton = () => {
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
              onleaveSession();
            }
            setIsBulr(false);
          })
      : Swal.fire({
          title: '현재 미팅에 참여중입니다.',
          text: '참여중인 미팅을 나가시겠습니까?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '확인',
          cancelButtonText: '취소',
        }).then((result) => {
          if (result.isConfirmed) {
            onleaveSession();
          }
          setIsBulr(false);
        });
  };

  const onleaveSession = () => {
    navigate(`/${param.workspaceId}/${param.channelId}`);
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
      <FunctionButton icon="exit" exit onClick={clickLeaveButton} />
    </FucntionButtonsContainer>
  );
};

export default FunctionButtons;
