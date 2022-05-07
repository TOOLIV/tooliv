import styled from '@emotion/styled';
import { createSession, createToken } from 'api/openvidu/session';
import isElectron from 'is-electron';
import ChatButton from 'molecules/meeting/ChatButton';
import MainStage from 'molecules/meeting/MainStage';
import { OpenVidu, Publisher, Session, StreamManager } from 'openvidu-browser';
import FunctionButtons from 'organisms/meeting/FunctionButtons';
import ScreenShareModal from 'organisms/meeting/video/ScreenShareModal';
import Videos from 'organisms/meeting/video/Videos';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { isOpenChat } from 'recoil/atom';

const MeetingContainer = styled.div`
  /* background-color: #787878; */
  height: calc(100vh - 194px);
`;

const MeetingInnerContainer = styled.div`
  height: calc(100vh - 252px);
  margin-bottom: 12px;
`;

const Meeting = () => {
  const [isChatOpen, setIsChatOpen] = useRecoilState<boolean>(isOpenChat);

  const onOpenChat = () => {
    setIsChatOpen(true);
  };

  const [OV, setOV] = useState<OpenVidu>();
  const [OVForScreenSharing, setOVForScreenSharing] = useState<OpenVidu>();
  const [session, setSession] = useState<Session>();
  const [sessionForScreenSharing, setSessionForScreenSharing] =
    useState<Session>();

  const [initUserData, setInitUserData] = useState({
    mySessionId: 'test3',
    myUserName: 'Participant' + Math.floor(Math.random() * 100),
  });
  const [initScreenData, setInitScreenData] = useState({
    mySessionId: initUserData.mySessionId + '_screen',
    myScreenName: initUserData.myUserName + '_screen',
  });

  const [mainStreamManager, setMainStreamManager] =
    useState<StreamManager | null>(null);

  const [publisher, setPublisher] = useState<Publisher | null>(null);
  const [subscribers, setSubscribers] = useState<Array<StreamManager>>([]);
  const [publisherForScreenSharing, setPublisherForScreenSharing] =
    useState<Publisher | null>(null);

  const [isAudioOn, setIsAudioOn] = useState<boolean>(true);
  const [isVideoOn, setIsVideoOn] = useState<boolean>(true);

  const [isReadyScreenSharing, setIsReadyScreenSharing] =
    useState<boolean>(false);

  const [doScreenSharing, setDoScreenSharing] = useState<boolean>(false);
  const [doStartScreenSharing, setDoStartScreenSharing] = useState<boolean>(false);
  const [doStopScreenSharing, setDoStopScreenSharing] = useState<boolean>(false);
  const [isScreen, setIsScreen] = useState<boolean>(false);
  const [pauseScreenSharing, setPauseScreenSharing] = useState<boolean>();

  const [choiceScreen, setChoiceScreen] = useState<string>('');
  const [openScreenModal, setOpenScreenModal] = useState<boolean>(false);

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
    const newSession = newOV.initSession();

    setOV(newOV);
    setSession(newSession);

    const connection = () => {
      newSession.on('streamCreated', (event) => {
        const newSubscriber = newSession.subscribe(
          event.stream,
          JSON.parse(event.stream.connection.data).clientData
        );
        if (newSubscriber.stream.typeOfVideo === 'CAMERA') {
          const newSubscribers = subscribers;
          newSubscribers.push(newSubscriber);

          setSubscribers([...newSubscribers]);
        } else {
          // 비디오인 경우 화면 공유 스트림
          setMainStreamManager(newSubscriber);
          setIsScreen(true);
          setPauseScreenSharing(true);
        }
      });

      newSession.on('streamDestroyed', (event) => {
        if (event.stream.typeOfVideo === 'CAMERA') {
          deleteSubscriber(event.stream.streamManager);
        } else {
          setMainStreamManager(null);
          setIsScreen(false);
        }
      });

      newSession.on('publisherStartSpeaking', (event) => {
        console.log(event);
      });

      newSession.on('publisherStopSpeaking', (event) => {
        console.log(event);
      });

      newSession.on('sessionDisconnected', (event) => {
        console.log(event);
      });

      newSession.on('exception', (exception) => {
        console.warn(exception);
      });

      getToken(initUserData.mySessionId).then((token: any) => {
        newSession
          .connect(token, { clientData: initUserData.myUserName })
          .then(async () => {
            const devices = await newOV.getDevices();
            const videoDevices = devices.filter(
              (device) => device.kind === 'videoinput'
            );

            const newPublisher = newOV.initPublisher(initUserData.myUserName, {
              audioSource: undefined,
              videoSource: videoDevices[0].deviceId,
              publishAudio: isAudioOn,
              publishVideo: isVideoOn,
              resolution: '1080x720',
              frameRate: 10,
              insertMode: 'APPEND',
              mirror: true,
            });

            newSession.publish(newPublisher);
            setPublisher(newPublisher);
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

  // useEffect(() => {
  //   console.log(isScreenSharing);
  //   if (isScreenSharing) {
  //     console.log('화면공유 중지>>>>>>>>>>>>>>>>>>>>>>>>');
  //     if (!sessionForScreenSharing) return;
  //     if (!publisherForScreenSharing) return;
  //     sessionForScreenSharing.unpublish(publisherForScreenSharing);
  //   }
  // }, [pauseScreenSharing]);


  // 화면 공유 준비
  // useEffect(() => {
  //   console.log(sessionForScreenSharing);
  //   if (!isReadyScreenSharing) {
  //     stopScreenShare();
  //     setChoiceScreen('');
  //   } else {
  //     if (isElectron() && choiceScreen) {
  //       startScreenShare();
  //     } else if (isElectron() && !choiceScreen) {
  //       setOpenScreenModal(true);
  //     } else {
  //       startScreenShare();
  //     }
  //   }
  // }, [isReadyScreenSharing, choiceScreen]);

  useEffect(() => {
    if (doStartScreenSharing) {
      if (isElectron()) {
        setOpenScreenModal(true);
      } else {
        startScreenShare();
      }
    }
  }, [doStartScreenSharing])

  // 일렉트론에서 공유할 화면 선택하면
  useEffect(() => {
    if (doStartScreenSharing && choiceScreen) {
      startScreenShare();
    }
  }, [choiceScreen])

  useEffect(() => {
    if (doStopScreenSharing) {
      stopScreenShare()
    }
  }, [doStopScreenSharing])

  const deleteSubscriber = (streamManager: StreamManager) => {
    let prevSubscribers = subscribers;
    let index = prevSubscribers.indexOf(streamManager, 0);
    if (index > -1) {
      prevSubscribers.splice(index, 1);
      setSubscribers([...prevSubscribers]);
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
    const newSession = newOV.initSession();
    setOVForScreenSharing(newOV);
    setSessionForScreenSharing(newSession);

    await getToken(initUserData.mySessionId).then((token: any) => {
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
              resolution: '1080x720', // The resolution of your video
              frameRate: 10, // The frame rate of your video
              // insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
            })
            .then((newPublisher) => {
              newSession.publish(newPublisher);
              setPublisherForScreenSharing(newPublisher);
              setDoScreenSharing(true);
              setDoStartScreenSharing(false);
            })
            .catch(() => {
              console.log('화면 공유 실패!!!!!');
              setDoStartScreenSharing(false);
            });
        })
        .catch((error) => {
          console.log(
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
      <MeetingInnerContainer>
        {publisher && (
          <Videos
            publisher={publisher}
            subscribers={subscribers}
            isScreen={isScreen}
          />
        )}
        {mainStreamManager && (
          <MainStage streamManager={mainStreamManager}></MainStage>
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
