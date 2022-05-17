import styled from '@emotion/styled';
import PublisherVideo from 'molecules/meeting/PublisherVideo';
import SubscriberVideo from 'molecules/meeting/SubscriberVideo';
import { StreamManager } from 'openvidu-browser';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { isOpenChat, isOpenSide } from '../../../recoil/atom';
import { videosTypes } from '../../../types/meeting/openviduTypes';

const VideoContainer = styled.div<{
  isChat: boolean;
  isScreenSharing: boolean;
  isHideCam: boolean;
}>`
  display: ${(props) => (props.isHideCam ? 'none' : 'flex')};
  flex-wrap: ${(props) => (props.isScreenSharing ? '' : 'wrap')};
  place-items: center;
  justify-content: ${(props) => (props.isScreenSharing ? '' : 'center')};
  align-items: center;
  gap: 4px;
  width: inherit;
  height: ${(props) => (props.isScreenSharing ? '15vh' : 'calc(100% - 12px)')};
  overflow-x: ${(props) => (props.isScreenSharing ? 'scroll' : '')};
  overflow-y: hidden;
`;

const Videos = ({
  publisher,
  subscribers,
  isScreenSharing,
  isSpeakList,
  isHideCam,
}: videosTypes) => {
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
    <VideoContainer
      isChat={isChat}
      isScreenSharing={isScreenSharing}
      isHideCam={isHideCam}
    >
      <PublisherVideo
        publisher={publisher}
        rowCnt={rowCnt}
        colCnt={colCnt}
        isScreenSharing={isScreenSharing}
        isSpeak={isSpeakList.includes(publisher.stream.connection.connectionId)}
      />
      {subscribers.map((sub: StreamManager) => (
        <SubscriberVideo
          subscriber={sub}
          rowCnt={rowCnt}
          colCnt={colCnt}
          isScreenSharing={isScreenSharing}
          key={sub.stream.connection.connectionId}
          isSpeak={isSpeakList.includes(sub.stream.connection.connectionId)}
        />
      ))}
    </VideoContainer>
  );
};

export default Videos;
