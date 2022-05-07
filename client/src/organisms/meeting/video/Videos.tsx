import styled from '@emotion/styled';
import PublisherVideo from 'molecules/meeting/PublisherVideo';
import SubscriberVideo from 'molecules/meeting/SubscriberVideo';
import { StreamManager } from 'openvidu-browser';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { isOpenChat, isOpenSide } from '../../../recoil/atom';
import { videosTypes } from '../../../types/meeting/openviduTypes';

const VideoContainer = styled.div<{ isChat: boolean; isScreen: boolean }>`
  display: flex;
  flex-wrap: ${(props) => (props.isScreen ? '' : 'wrap')};
  place-items: center;
  justify-content: ${(props) => (props.isScreen ? '' : 'center')};
  align-items: center;
  gap: 4px;
  width: inherit;
  height: ${(props) => (props.isScreen ? '15vh' : 'calc(100% - 12px)')};
  overflow-x: ${props => props.isScreen? 'scroll':""};
  overflow-y: hidden;
`;

const Videos = ({ publisher, subscribers, isScreen }: videosTypes) => {
  const isChat = useRecoilValue(isOpenChat);
  const isSide = useRecoilValue(isOpenSide);
  const [rowCnt, setRowCnt] = useState<number>(1);
  const [colCnt, setColCnt] = useState<number>(1);

  useEffect(() => {
    const count = subscribers.length + 1;

    const row =
      (!isSide || !isChat) && count > 4
        ? Math.ceil(count / 2)
        : (!isSide || !isChat) && count > 1
        ? 2
        : (!isSide || !isChat) && count === 1
        ? 1
        : isSide && isChat && count > 1
        ? 2
        : 1;
    const col = Math.ceil(count / row);

    setRowCnt(row);
    setColCnt(col);
  }, [publisher, subscribers, isChat, isSide]);

  return (
    <VideoContainer isChat={isChat} isScreen={isScreen}>
      <PublisherVideo
        publisher={publisher}
        rowCnt={rowCnt}
        colCnt={colCnt}
        isScreenSharing={isScreen}
      />
      {subscribers.map((sub: StreamManager) => (
        <SubscriberVideo
          subscriber={sub}
          rowCnt={rowCnt}
          colCnt={colCnt}
          isScreenSharing={isScreen}
          key={sub.stream.connection.connectionId}
        />
      ))}
    </VideoContainer>
  );
};

export default Videos;
