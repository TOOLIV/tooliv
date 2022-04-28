import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { colors } from '../../../shared/color';
import { screenShareMadalPropsTypes } from '../../../types/meeting/openviduTypes';

const ModalContainer = styled.div`
  position: absolute;
  width: 55vw;
  height: 90vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  background-color: white;
  border-radius: 10px;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
    rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;

  overflow-y: scroll;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${colors.gray400};
    border-radius: 45px;
  }
  ::-webkit-scrollbar-track {
    background-color: ${colors.white};
  }
`;

const ScreenItem = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 10px 20px;

  & + & {
    margin-top: 20px;
  }

  :hover {
    background-color: ${colors.gray100};
  }
`;

const ScreenShareModal = ({
  setIsScreenShareModal,
}: screenShareMadalPropsTypes) => {
  const [screenList, setScreenList] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const desktopCapturer = {
    getSources: async (opts: any) =>
      window.ipcRenderer.invoke('DESKTOP_CAPTURER_GET_SOURCES', opts),
  };
  const getScreenSource = async () => {
    return await desktopCapturer.getSources({ types: ['window', 'screen'] });
  };

  useEffect(() => {
    if (!isLoading) {
      getScreenSource().then((data) => {
        setScreenList(data);
        setIsLoading(true);
      });
    } else {
      console.log(screenList);
    }
  }, [isLoading]);

  const onClickScreenItem = () => {
    setIsScreenShareModal(false);
  };

  return (
    <ModalContainer>
      <div>화면 목록</div>
      {isLoading &&
        screenList &&
        screenList.map((stream: any) => (
          <ScreenItem key={stream.name} onClick={onClickScreenItem}>
            <img src={stream.thumbnail.toDataURL()} />
            <div>{stream.name}</div>
          </ScreenItem>
        ))}
    </ModalContainer>
  );
};

export default ScreenShareModal;
