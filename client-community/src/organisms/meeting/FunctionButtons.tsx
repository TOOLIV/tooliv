import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import FunctionButton from '../../molecules/meeting/FunctionButton';
import { funcButtonPropsTypes } from '../../types/meeting/openviduTypes';
import Swal from 'sweetalert2';

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

  // 미팅 나가기 클릭시 이벤트
  const clickLeaveButton = () => {
    if (location.pathname.includes('meeting')) {
      Swal.fire({
        title: '미팅을 종료하시겠습니까?',
        text: '확인 버튼 클릭 시 화상미팅이 종료됩니다.',
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
      });
    } else {
      onleaveSession();
    }
  };

  const onleaveSession = () => {
    navigate(`/${param.workspaceId}/${param.channelId}`);
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
      <FunctionButton icon="exit" exit onClick={clickLeaveButton} />
    </FucntionButtonsContainer>
  );
};

export default FunctionButtons;
