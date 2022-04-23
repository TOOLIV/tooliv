import styled from '@emotion/styled';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { isOpenChat } from '../../../recoil/atom';

const VideoContainer = styled.div<{ isChatOpen: boolean }>`
  display: flex;
  flex-wrap: wrap;
  place-items: center;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: inherit;
  height: calc(100vh - 180px);
  background-color: #121212;
`;

const Video = styled.div`
  width: 20vw;
  height: 20vh;
  background-color: black;
  border-radius: 10px;
`;

const Videos = () => {
  const isChatOpen = useRecoilValue(isOpenChat);

  return (
    <div>
      <VideoContainer isChatOpen={isChatOpen}>
        <Video />
        <Video />
        <Video />
        <Video />
      </VideoContainer>
    </div>
  );
};

export default Videos;
