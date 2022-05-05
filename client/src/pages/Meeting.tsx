import styled from '@emotion/styled';
import axios from 'axios';
import isElectron from 'is-electron';
import ChatButton from 'molecules/meeting/ChatButton';
import MainStage from 'molecules/meeting/MainStage';
import VideoCopy from 'molecules/meeting/VideoCopy';
import { OpenVidu, Publisher, Session, StreamManager } from 'openvidu-browser';
import FunctionButtons from 'organisms/meeting/FunctionButtons';
import ScreenShareModal from 'organisms/meeting/video/ScreenShareModal';
import VideosCopy from 'organisms/meeting/video/VideosCopy';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { isOpenChat } from 'recoil/atom';

const MeetingContainer = styled.div`
  /* background-color: #787878; */
  height: calc(100vh - 216px);
`;

const MeetingInnerContainer = styled.div`
  height: calc(100vh - 240px);
`;

const Meeting = () => {
  const [isChatOpen, setIsChatOpen] = useRecoilState<boolean>(isOpenChat);

  const onOpenChat = () => {
    setIsChatOpen(true);
  };

  const [OV, setOV] = useState<OpenVidu>(new OpenVidu());
  const [session, setSession] = useState<Session>(OV.initSession());

  const [initUserData, setInitUserData] = useState({
    mySessionId: 'test3',
    myUserName: 'Participant' + Math.floor(Math.random() * 100),
  });

  const [mainStreamManager, setMainStreamManager] = useState<
    StreamManager | undefined
  >();

  const [publisher, setPublisher] = useState<Publisher | undefined>();
  const [subscribers, setSubscribers] = useState<Array<StreamManager>>([]);
  const [connectionId, setConnectionId] = useState<string | undefined>();

  //////////////////test/////////////////////
  const [OVForScreen, setOVForScreen] = useState<OpenVidu>(new OpenVidu());
  const [sessionForScreen, setSessionForScreen] = useState<Session>(
    OVForScreen.initSession()
  );
  const [initScreenData, setInitScreenData] = useState({
    mySessionId: initUserData.mySessionId + '_screen',
    myScreenName: initUserData.myUserName + '_screen',
  });

  const [publisherForScreenSharing, setPublisherForScreenSharing] =
    useState<Publisher | null>();

  const [isScreenSharing, setIsScreenSharing] = useState<boolean>(false);
  const [subscribersForScreenShare, setSubscribersForScreenShare] = useState<
    Array<StreamManager>
  >([]);

  const [isAudioOn, setIsAudioOn] = useState<boolean>(true);
  const [isVideoOn, setIsVideoOn] = useState<boolean>(true);
  const [isScreen, setIsScreen] = useState<boolean>(false);
  const [pauseScreenSharing, setPauseScreenSharing] = useState<boolean>(false);
  const [choiceScreen, setChoiceScreen] = useState<string>('');
  const [openScreenModal, setOpenScreenModal] = useState<boolean>(false);

  useEffect(() => {
    console.log('join>>>>>>>>>>>>>>>>');
    OV.enableProdMode();
    OVForScreen.enableProdMode();
    return () => {
      leaveSession();
      leaveScreenSharingSession();
    };
  }, []);

  const onbeforeunload = () => {
    leaveSession();
    leaveScreenSharingSession();
  };

  useEffect(() => {
    if (session) {
      console.log('session>>>>>>>>>>>>>>>', session);
      test();
    }
  }, [session]);

  useEffect(() => {
    if (sessionForScreen) {
      console.log('sessionForScreenSharing', sessionForScreen);
      test2();
    }
  }, [sessionForScreen]);

  const test = async () => {
    console.log('createConnection>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    const mySession = session;
    // --- 3) Specify the actions when events take place in the session ---

    // On every new Stream received...
    mySession.on('streamCreated', (event) => {
      // if (event.stream.typeOfVideo === 'CAMERA') {
      // Subscribe to the Stream to receive it. Second parameter is undefined
      // so OpenVidu doesn't create an HTML video by its own
      mySession
        .subscribeAsync(
          event.stream,
          JSON.parse(event.stream.connection.data).clientData
        )
        .then((subscriber) => {
          const newSubscribers = subscribers;
          newSubscribers.push(subscriber);

          setSubscribers([...newSubscribers]);
        });
      // Update the state with the new subscribers
    });

    // On every Stream destroyed...
    mySession.on('streamDestroyed', (event) => {
      // Remove the stream from 'subscribers' array
      deleteSubscriber(event.stream.streamManager);
    });

    mySession.on('sessionDisconnected', (event) => {
      console.log(event);
    });

    // On every asynchronous exception...
    mySession.on('exception', (exception) => {
      console.warn(exception);
    });

    mySession.on('signal:startScreenSharing', (event) => {
      console.log(event);
    });

    mySession.on('signal:stopScreenSharing', (event) => {
      console.log(event);
    });

    // --- 4) Connect to the session with a valid user token ---

    // 'getToken' method is simulating what your server-side should do.
    // 'token' parameter should be retrieved and returned by your own backend
    await getToken().then((token: any) => {
      // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
      // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
      mySession
        .connect(token.data.token, {
          clientData: initUserData.myUserName,
        })
        .then(async () => {
          if (!OV) return;
          var devices = await OV.getDevices();
          var videoDevices = devices.filter(
            (device) => device.kind === 'videoinput'
          );

          // --- 5) Get your own camera stream ---

          // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
          // element: we will manage it on our own) and with the desired properties
          OV.initPublisherAsync(initUserData.myUserName, {
            audioSource: false, // The source of audio. If undefined default microphone
            videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
            // videoSource: 'screen', // The source of video. If undefined default webcam
            publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
            publishVideo: true, // Whether you want to start publishing with your video enabled or not
            resolution: '680x480', // The resolution of your video
            frameRate: 30, // The frame rate of your video
            insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
            mirror: false, // Whether to mirror your local video or not
          }).then((publisher) => {
            mySession.publish(publisher);
            setPublisher(publisher);
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

  const test2 = async () => {
    const mySession = sessionForScreen;

    mySession.on('streamCreated', (event) => {
      console.log('>>>>>>>>>>>>>>>>>>> screenshareCreated');
      mySession
        .subscribeAsync(
          event.stream,
          JSON.parse(event.stream.connection.data).clientData
        )
        .then((subscriber) => {
          console.log('>>>>>>>>>>>>>>>>>>>>>>>>sub :', subscriber);
          setPauseScreenSharing(true);
          setMainStreamManager(subscriber);
          setIsScreen(true);
        })
        .catch((e) =>
          console.log('streamCreatedError>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', e)
        );
      console.log(event);
    });

    mySession.on('streamDestroyed', (event) => {
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>> screenShareStopped');
      console.log(event);
      setIsScreen(false);
    });

    await getTokenForScreenShare().then((token: any) => {
      mySession.connect(token.data.token, {
        clientData: initUserData.myUserName,
      });
    });
  };

  useEffect(() => {
    if (!isScreenSharing) {
      stopScreenShare();
      setChoiceScreen('');
    } else {
      if (isElectron() && choiceScreen) {
        startScreenShare();
      } else if (isElectron() && !choiceScreen) {
        setOpenScreenModal(true);
      } else {
        startScreenShare();
      }
    }
  }, [isScreenSharing, choiceScreen]);

  const deleteSubscriber = (streamManager: StreamManager) => {
    let prevSubscribers = subscribers;
    let index = prevSubscribers.indexOf(streamManager, 0);
    if (index > -1) {
      prevSubscribers.splice(index, 1);
      setSubscribers([...prevSubscribers]);
    }
  };

  const deleteSubscriberForScreenShare = (streamManager: StreamManager) => {
    let prevSubscribersForScreenShare = subscribersForScreenShare;
    let index = prevSubscribersForScreenShare.indexOf(streamManager, 0);
    if (index > -1) {
      prevSubscribersForScreenShare.splice(index, 1);
      setSubscribersForScreenShare([...prevSubscribersForScreenShare]);
    }
  };

  const leaveSession = () => {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---
    console.log(session);
    if (!session) return;
    const mySession = session;

    mySession.disconnect();

    // Empty all properties...
    // setOV(null);
    // setSession(undefined);
    setMainStreamManager(undefined);
    setPublisher(undefined);
    setSubscribers([]);
  };

  const leaveScreenSharingSession = () => {
    if (!sessionForScreen) return;
    const mySession = sessionForScreen;

    mySession.disconnect();

    // setOVForScreen(null);
    // setSessionForScreen(undefined);
    setSubscribersForScreenShare([]);
  };

  const getToken = async () => {
    return await createSession(initUserData.mySessionId).then(
      async (sessionId) => await createToken(sessionId)
    );
  };

  const getTokenForScreenShare = async () => {
    return await createSession(initScreenData.mySessionId).then(
      async (sessionId) => await createToken(sessionId)
    );
  };

  const startScreenShare = async () => {
    const OVForScreenShare = OVForScreen;
    const mySession = sessionForScreen;

    await getTokenForScreenShare().then((token: any) => {
      setConnectionId(token.data.connectionId);
      if (!mySession) return;
      // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
      // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
      mySession
        .connect(token.data.token, {
          clientData: initScreenData.myScreenName,
        })
        .then(async () => {
          if (!OVForScreenShare) return;
          // --- 5) Get your own camera stream ---

          // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
          // element: we will manage it on our own) and with the desired properties
          OVForScreenShare.initPublisherAsync(initUserData.myUserName, {
            audioSource: false, // The source of audio. If undefined default microphone
            // videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
            videoSource: isElectron() ? 'screen: ' + choiceScreen : 'screen', // The source of video. If undefined default webcam
            publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
            publishVideo: true, // Whether you want to start publishing with your video enabled or not
            resolution: '1080x720', // The resolution of your video
            frameRate: 30, // The frame rate of your video
            insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
            mirror: true, // Whether to mirror your local video or not
          }).then((publisher) => {
            mySession.publish(publisher);
            setPublisherForScreenSharing(publisher);
            publisher.once('accessAllowed', () => {
              try {
                console.log('startScreenSharing');
                session?.signal({
                  type: 'startScreenSharing',
                });
              } catch (e) {
                console.log('Error applying constraints: ', e);
              }
            });

            publisher.once('accessDenied', () => {
              console.warn('ScreenShare: Access Denied');
            });
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
    if (publisherForScreenSharing)
      sessionForScreen.unpublish(publisherForScreenSharing);
  };

  const createSession = async (sessionId: any) => {
    return await new Promise((resolve, reject) => {
      var data = JSON.stringify({ customSessionId: sessionId });
      axios
        .post(
          process.env.REACT_APP_OPENVIDU_SERVER_URL + '/openvidu/api/sessions',
          data,
          {
            headers: {
              Authorization:
                'Basic ' +
                btoa(
                  'OPENVIDUAPP:' + process.env.REACT_APP_OPENVIDU_SERVER_SECRET
                ),
              'Content-Type': 'application/json',
            },
          }
        )
        .then((response) => {
          console.log('CREATE SESION', response);
          resolve(response.data.id);
        })
        .catch((response) => {
          var error = Object.assign({}, response);
          if (error?.response?.status === 409) {
            resolve(sessionId);
          } else {
            console.warn(
              'No connection to OpenVidu Server. This may be a certificate error at ' +
                process.env.REACT_APP_OPENVIDU_SERVER_URL
            );
            if (
              window.confirm(
                'No connection to OpenVidu Server. This may be a certificate error at "' +
                  process.env.REACT_APP_OPENVIDU_SERVER_URL +
                  '"\n\nClick OK to navigate and accept it. ' +
                  'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                  process.env.REACT_APP_OPENVIDU_SERVER_URL +
                  '"'
              )
            ) {
              window.location.assign(
                process.env.REACT_APP_OPENVIDU_SERVER_URL +
                  '/accept-certificate'
              );
            }
          }
        });
    });
  };

  const deleletAllSession = () => {
    deleteSession();
    deleteSessionForScreenShare();
  };

  const deleteSession = () => {
    return new Promise((resolve, reject) => {
      axios.delete(
        process.env.REACT_APP_OPENVIDU_SERVER_URL +
          `/openvidu/api/sessions/${initUserData.mySessionId}`,
        {
          headers: {
            Authorization:
              'Basic ' +
              btoa(
                'OPENVIDUAPP:' + process.env.REACT_APP_OPENVIDU_SERVER_SECRET
              ),
            'Content-Type': 'application/json',
          },
        }
      );
    });
  };

  const deleteSessionForScreenShare = () => {
    return new Promise((resolve, reject) => {
      axios.delete(
        process.env.REACT_APP_OPENVIDU_SERVER_URL +
          `/openvidu/api/sessions/${initScreenData.mySessionId}`,
        {
          headers: {
            Authorization:
              'Basic ' +
              btoa(
                'OPENVIDUAPP:' + process.env.REACT_APP_OPENVIDU_SERVER_SECRET
              ),
            'Content-Type': 'application/json',
          },
        }
      );
    });
  };

  const createToken = async (sessionId: any) => {
    return await new Promise((resolve, reject) => {
      var data = {};
      axios
        .post(
          process.env.REACT_APP_OPENVIDU_SERVER_URL +
            '/openvidu/api/sessions/' +
            sessionId +
            '/connection',
          data,
          {
            headers: {
              Authorization:
                'Basic ' +
                btoa(
                  'OPENVIDUAPP:' + process.env.REACT_APP_OPENVIDU_SERVER_SECRET
                ),
              'Content-Type': 'application/json',
            },
          }
        )
        .then((response) => {
          console.log('TOKEN', response);
          resolve(response);
          // setConnectionId(response.data.connectionId);
        })
        .catch((error) => reject(error));
    });
  };

  return (
    <MeetingContainer>
      <MeetingInnerContainer>
        <VideosCopy
          publisher={publisher}
          subscribers={subscribers}
          isScreen={isScreen}
        />
        {isScreen && mainStreamManager && (
          <MainStage streamManager={mainStreamManager}></MainStage>
        )}
        {openScreenModal && (
          <ScreenShareModal
            setIsScreenShareModal={setOpenScreenModal}
            setChoiceScreen={setChoiceScreen}
          />
        )}
      </MeetingInnerContainer>
      <FunctionButtons
        isAudioOn={isAudioOn}
        isVideoOn={isVideoOn}
        setIsAudioOn={setIsAudioOn}
        setIsVideoOn={setIsVideoOn}
        publisher={publisher}
        isScreenSharing={isScreenSharing}
        setIsScreenSharing={setIsScreenSharing}
        leaveSession={onbeforeunload}
      />
      {!isChatOpen && <ChatButton onClick={onOpenChat} />}
    </MeetingContainer>
  );
};

export default Meeting;
