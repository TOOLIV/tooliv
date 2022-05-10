import styled from '@emotion/styled';
import { createSession, createToken } from 'api/openvidu/session';
import Button from 'atoms/common/Button';
import isElectron from 'is-electron';
import ChatButton from 'molecules/meeting/ChatButton';
import MainStage from 'molecules/meeting/MainStage';
import { OpenVidu, Publisher, Session, StreamManager } from 'openvidu-browser';
import FunctionButtons from 'organisms/meeting/FunctionButtons';
import ScreenShareModal from 'organisms/meeting/video/ScreenShareModal';
import Videos from 'organisms/meeting/video/Videos';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isOpenChat } from 'recoil/atom';
import { user } from 'recoil/auth';

const MeetingContainer = styled.div`
  /* background-color: #787878; */
  height: calc(100vh - 194px);
  position: relative;
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: -29px;
  right: 0;
`;

const MeetingInnerContainer = styled.div`
  height: calc(100vh - 244px);
  margin-bottom: 4px;
`;

const Meeting = () => {
  const [isChatOpen, setIsChatOpen] = useRecoilState<boolean>(isOpenChat);

  const onOpenChat = () => {
    setIsChatOpen(true);
  };

  const { workspaceId, channelId } = useParams();
  const userInfo = useRecoilValue(user);

  const [OV, setOV] = useState<OpenVidu>();
  const [OVForScreenSharing, setOVForScreenSharing] = useState<OpenVidu>();
  const [session, setSession] = useState<Session>();
  const [sessionForScreenSharing, setSessionForScreenSharing] =
    useState<Session>();

  const [initUserData, setInitUserData] = useState({
    mySessionId: channelId,
    myUserName: userInfo.nickname,
  });
  const [initScreenData, setInitScreenData] = useState({
    mySessionId: initUserData.mySessionId + '_screen',
    myScreenName: initUserData.myUserName + '님의 화면',
  });

  const [mainStreamManager, setMainStreamManager] =
    useState<StreamManager | null>(null);

  const [publisher, setPublisher] = useState<Publisher | null>(null);
  const [subscribers, setSubscribers] = useState<Array<StreamManager>>([]);
  const [isSpeakList, setIsSpeakList] = useState<Array<string>>([]);
  const [publisherForScreenSharing, setPublisherForScreenSharing] =
    useState<Publisher | null>(null);

  const [isAudioOn, setIsAudioOn] = useState<boolean>(true);
  const [isVideoOn, setIsVideoOn] = useState<boolean>(true);

  const [doScreenSharing, setDoScreenSharing] = useState<boolean>(false);
  const [doStartScreenSharing, setDoStartScreenSharing] =
    useState<boolean>(false);
  const [doStopScreenSharing, setDoStopScreenSharing] =
    useState<boolean>(false);
  const [isScreenSharing, setIsScreenSharing] = useState<boolean>(false);
  const [doPauseScreenSharing, setDoPauseScreenSharing] =
    useState<boolean>(false);
  const [checkMyScreen, setCheckMyScreen] = useState<boolean>(false);
  const [destroyedStream, setDestroyedStream] = useState<StreamManager | null>(
    null
  );

  const [choiceScreen, setChoiceScreen] = useState<string>('');
  const [openScreenModal, setOpenScreenModal] = useState<boolean>(false);
  const [isHideCam, setIsHideCam] = useState<boolean>(false);

  useEffect(() => {
    joinSession();
  }, []);

  useEffect(() => {
    window.addEventListener('beforeunload', leaveSession);
    return () => {
      leaveSession();
      window.removeEventListener('beforeunload', leaveSession);
    };
  }, [session]);

  useEffect(() => {
    window.addEventListener('beforeunload', leaveSessionForScreenSharing);
    return () => {
      leaveSessionForScreenSharing();
      window.removeEventListener('beforeunload', leaveSessionForScreenSharing);
    };
  }, [sessionForScreenSharing]);

  const joinSession = () => {
    const newOV = new OpenVidu();
    newOV.enableProdMode();
    const newSession = newOV.initSession();

    setOV(newOV);
    setSession(newSession);

    const connection = () => {
      newSession.on('streamCreated', (event) => {
        const newSubscriber = newSession.subscribe(
          event.stream,
          JSON.parse(event.stream.connection.data).clientData
        );
        if (newSubscriber.stream.typeOfVideo === 'CUSTOM') {
          const newSubscribers = subscribers;
          newSubscribers.push(newSubscriber);

          setSubscribers([...newSubscribers]);
        } else {
          // 비디오인 경우 화면 공유 스트림
          setMainStreamManager(newSubscriber);
          setIsScreenSharing(true);
          setDoPauseScreenSharing(true);
        }
      });

      newSession.on('streamDestroyed', (event) => {
        if (event.stream.typeOfVideo === 'CUSTOM') {
          deleteSubscriber(event.stream.streamManager);
        } else {
          setDestroyedStream(event.stream.streamManager);
          setCheckMyScreen(true);
        }
      });

      newSession.on('publisherStartSpeaking', (event) => {
        const newIsSpeakList = isSpeakList;
        newIsSpeakList.push(event.connection.connectionId);
        setIsSpeakList([...newIsSpeakList]);
      });

      newSession.on('publisherStopSpeaking', (event) => {
        deleteIsSperker(event.connection.connectionId);
      });

      // newSession.on('sessionDisconnected', (event) => {
      //   console.log(event);
      // });

      newSession.on('exception', (exception) => {
        console.warn(exception);
      });

      getToken(initUserData.mySessionId!).then((token: any) => {
        newSession
          .connect(token, { clientData: initUserData.myUserName })
          .then(async () => {
            // const devices = await newOV.getDevices();
            // console.log(devices);
            // const videoDevices = devices.filter(
            //   (device) => device.kind === 'videoinput'
            // );

            // const newPublisher = newOV.initPublisher(initUserData.myUserName, {
            //   audioSource: undefined,
            //   videoSource: videoDevices[0].deviceId,
            //   publishAudio: isAudioOn,
            //   publishVideo: isVideoOn,
            //   resolution: '1080x720',
            //   frameRate: 10,
            //   insertMode: 'APPEND',
            //   mirror: true,
            // });

            // newPublisher.once('accessAllowed', () => {
            //   newSession.publish(newPublisher);
            //   setPublisher(newPublisher);
            // });

            newOV
              .getUserMedia({
                audioSource: false,
                videoSource: undefined,
                resolution: '1280x720',
                frameRate: 10,
              })
              .then((mediaStream) => {
                var videoTrack = mediaStream.getVideoTracks()[0];

                var newPublisher = newOV.initPublisher(
                  initUserData.myUserName,
                  {
                    audioSource: undefined,
                    videoSource: videoTrack,
                    publishAudio: isAudioOn,
                    publishVideo: isVideoOn,
                    // resolution: '1280x720',
                    // frameRate: 10,
                    insertMode: 'APPEND',
                    mirror: true,
                  }
                );

                newPublisher.once('accessAllowed', () => {
                  newSession.publish(newPublisher);
                  setPublisher(newPublisher);
                });
              });
          })
          .catch((error) => {
            console.warn(
              'There was an error connecting to the session:',
              error.code,
              error.message
            );
          });
      });
    };
    connection();
  };

  useEffect(() => {
    if (doStartScreenSharing) {
      if (isElectron()) {
        setOpenScreenModal(true);
      } else {
        startScreenShare();
      }
    }
  }, [doStartScreenSharing]);

  // 일렉트론에서 공유할 화면 선택하면
  useEffect(() => {
    if (doStartScreenSharing && choiceScreen) {
      startScreenShare();
    }
  }, [choiceScreen]);

  useEffect(() => {
    if (doStopScreenSharing) {
      stopScreenShare();
      setIsHideCam(false);
    }
  }, [doStopScreenSharing]);

  useEffect(() => {
    if (doPauseScreenSharing) {
      if (
        doScreenSharing &&
        mainStreamManager?.stream.connection.connectionId !==
          publisherForScreenSharing?.stream.connection.connectionId
      ) {
        stopScreenShare();
      }
      setDoPauseScreenSharing(false);
    }
  }, [doPauseScreenSharing]);

  useEffect(() => {
    if (checkMyScreen) {
      if (
        destroyedStream?.stream.connection.connectionId ===
        mainStreamManager?.stream.connection.connectionId
      ) {
        setIsScreenSharing(false);
        setMainStreamManager(null);
        setIsHideCam(false);
      }
      setDestroyedStream(null);
      setCheckMyScreen(false);
    }
  }, [checkMyScreen]);

  const deleteSubscriber = (streamManager: StreamManager) => {
    let prevSubscribers = subscribers;
    let index = prevSubscribers.indexOf(streamManager, 0);
    if (index > -1) {
      prevSubscribers.splice(index, 1);
      setSubscribers([...prevSubscribers]);
    }
  };

  const deleteIsSperker = (connectionId: string) => {
    let prevIsSpeakList = isSpeakList;
    let index = prevIsSpeakList.indexOf(connectionId, 0);
    if (index > -1) {
      prevIsSpeakList.splice(index, 1);
      setIsSpeakList([...prevIsSpeakList]);
    }
  };

  const leaveSession = () => {
    if (!session) return;
    session?.disconnect();

    // Empty all properties...
    setPublisher(null);
    setSubscribers([]);
  };

  const leaveSessionForScreenSharing = () => {
    if (!sessionForScreenSharing) return;
    sessionForScreenSharing?.disconnect();
    setMainStreamManager(null);
  };

  const getToken = async (sessionId: string) => {
    return createSession(sessionId).then((sessionId: any) =>
      createToken(sessionId)
    );
  };

  const startScreenShare = async () => {
    const newOV = new OpenVidu();
    newOV.enableProdMode();
    const newSession = newOV.initSession();

    await getToken(initUserData.mySessionId!).then((token: any) => {
      // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
      // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
      newSession
        .connect(token, {
          clientData: initScreenData.myScreenName,
        })
        .then(() => {
          // --- 5) Get your own camera stream ---

          // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
          // element: we will manage it on our own) and with the desired properties
          newOV
            .initPublisherAsync(initScreenData.myScreenName, {
              audioSource: false, // The source of audio. If undefined default microphone
              // videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
              videoSource: isElectron() ? 'screen: ' + choiceScreen : 'screen', // The source of video. If undefined default webcam
              publishAudio: false,
              publishVideo: true,
              resolution: '1280x720', // The resolution of your video
              frameRate: 10, // The frame rate of your video
              // insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
            })
            .then((newPublisher) => {
              newSession.publish(newPublisher);
              setPublisherForScreenSharing(newPublisher);
              setDoScreenSharing(true);
              setDoStartScreenSharing(false);

              setOVForScreenSharing(newOV);
              setSessionForScreenSharing(newSession);
            })
            .catch(() => {
              setDoStartScreenSharing(false);
            });
        })
        .catch((error) => {
          console.warn(
            'There was an error connecting to the session:',
            error.code,
            error.message
          );
        });
    });
  };

  const stopScreenShare = () => {
    if (!sessionForScreenSharing) return;
    if (!publisherForScreenSharing) return;
    sessionForScreenSharing.unpublish(publisherForScreenSharing);
    if (isElectron()) setChoiceScreen('');
    setDoStopScreenSharing(false);
    setDoScreenSharing(false);
  };

  return (
    <MeetingContainer>
      {isScreenSharing && (
        <ButtonContainer>
          <Button
            text={isHideCam ? '카메라 표시' : '카메라 가리기'}
            width="110"
            height="28"
            bgColor="gray300"
            onClick={() => setIsHideCam(!isHideCam)}
          />
        </ButtonContainer>
      )}
      <MeetingInnerContainer>
        {publisher && !isHideCam && (
          <Videos
            publisher={publisher}
            subscribers={subscribers}
            isScreenSharing={isScreenSharing}
            isSpeakList={isSpeakList}
          />
        )}
        {mainStreamManager && (
          <MainStage streamManager={mainStreamManager} isHideCam={isHideCam} />
        )}
        {openScreenModal && (
          <ScreenShareModal
            setIsScreenShareModal={setOpenScreenModal}
            setChoiceScreen={setChoiceScreen}
            setDoStartScreenSharing={setDoStartScreenSharing}
          />
        )}
      </MeetingInnerContainer>
      {publisher && (
        <FunctionButtons
          isAudioOn={isAudioOn}
          isVideoOn={isVideoOn}
          setIsAudioOn={setIsAudioOn}
          setIsVideoOn={setIsVideoOn}
          publisher={publisher}
          doScreenSharing={doScreenSharing}
          setDoStartScreenSharing={setDoStartScreenSharing}
          setDoStopScreenSharing={setDoStopScreenSharing}
        />
      )}
      {!isChatOpen && <ChatButton onClick={onOpenChat} />}
    </MeetingContainer>
  );
};

export default Meeting;
