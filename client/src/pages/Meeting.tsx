import styled from '@emotion/styled';
import axios from 'axios';
import isElectron from 'is-electron';
import ChatButton from 'molecules/meeting/ChatButton';
import VideoCopy from 'molecules/meeting/VideoCopy';
import { OpenVidu, Publisher, Session, StreamManager } from 'openvidu-browser';
import FunctionButtons from 'organisms/meeting/FunctionButtons';
import VideosCopy from 'organisms/meeting/video/VideosCopy';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { isOpenChat } from 'recoil/atom';

const MeetingContainer = styled.div`
  /* background-color: #787878; */
  height: calc(100vh - 256px);
`;

const MeetingInnerContainer = styled.div`
  height: calc(100vh - 216px);
`;

const Meeting = () => {
  const [isChatOpen, setIsChatOpen] = useRecoilState<boolean>(isOpenChat);

  const onOpenChat = () => {
    setIsChatOpen(true);
  };

  const [OV, setOV] = useState<OpenVidu | null>();
  const [initUserData, setInitUserData] = useState({
    mySessionId: 'test3',
    myUserName: 'Participant' + Math.floor(Math.random() * 100),
  });
  const [session, setSession] = useState<Session | undefined>();
  const [mainStreamManager, setMainStreamManager] = useState<
    StreamManager | undefined
  >();

  const [subscribersForScreenShare, setSubscribersForScreenShare] = useState<
    Array<StreamManager>
  >([]);
  const [publisher, setPublisher] = useState<Publisher | undefined>();
  const [subscribers, setSubscribers] = useState<Array<StreamManager>>([]);
  const [connectionId, setConnectionId] = useState<string | undefined>();
  const [isScreenSharing, setIsScreenSharing] = useState<boolean>(false);
  const [test, setTest] = useState<boolean>(false);

  //////////////////test/////////////////////
  const [OVForScreen, setOVForScreen] = useState<OpenVidu | null>();
  const [initScreenData, setInitScreenData] = useState({
    mySessionId: initUserData.mySessionId + '_screen',
    myScreenName: initUserData.myUserName + '_screen',
  });
  const [isAudioOn, setIsAudioOn] = useState<boolean>(true);
  const [isVideoOn, setIsVideoOn] = useState<boolean>(true);

  const [sessionForScreen, setSessionForScreen] = useState<
    Session | undefined
  >();
  const [screenPublisher, setScreenPublisher] = useState<
    Publisher | undefined
  >();
  const [screenSubscriber, setScreenSubscriber] = useState<
    StreamManager | undefined
  >();

  useEffect(() => {
    window.addEventListener('beforeunload', onbeforeunload);
    if (!session) {
      joinSession();
    }
    return () => {
      leaveSession();
      window.removeEventListener('beforeunload', onbeforeunload);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('beforeunload', onbeforeunload);
    if (!sessionForScreen) {
      joinSessionForScreenShare();
    }
    return () => {
      leaveScreenSharingSession();
      window.removeEventListener('beforeunload', onbeforeunload);
    };
  }, []);

  const onbeforeunload = (event: any) => {
    leaveSession();
    leaveScreenSharingSession();
  };

  useEffect(() => {
    if (session) {
      const mySession = session;
      // --- 3) Specify the actions when events take place in the session ---

      // On every new Stream received...
      mySession.on('streamCreated', (event) => {
        // if (event.stream.typeOfVideo === 'CAMERA') {
        // Subscribe to the Stream to receive it. Second parameter is undefined
        // so OpenVidu doesn't create an HTML video by its own
        const newSubscriber = mySession.subscribe(
          event.stream,
          JSON.parse(event.stream.connection.data).clientData
        );
        const newSubscribers = subscribers;
        newSubscribers.push(newSubscriber);
        setSubscribers([...newSubscribers]);
        // } else if (event.stream.typeOfVideo === 'SCREEN') {
        //   const newSubscriber = mySession.subscribe(
        //     event.stream,
        //     JSON.parse(event.stream.connection.data).clientData
        //   );
        //   const newSubscribers = [];
        //   newSubscribers.push(newSubscriber);
        //   setSubscribersForScreenShare([...newSubscribers]);
        //   setTest(true);
        // }

        // Update the state with the new subscribers
      });

      // On every Stream destroyed...
      mySession.on('streamDestroyed', (event) => {
        if (event.stream.typeOfVideo === 'CAMERA') {
          // Remove the stream from 'subscribers' array
          deleteSubscriber(event.stream.streamManager);
        } else if (event.stream.typeOfVideo === 'SCREEN') {
          deleteSubscriberForScreenShare(event.stream.streamManager);
          setIsScreenSharing(false);
          setTest(false);
          // leaveScreenSharingSession();
        }
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
      getToken().then((token: any) => {
        // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
        // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
        mySession
          .connect(token.data.token, { clientData: initUserData.myUserName })
          .then(async () => {
            if (!OV) return;
            var devices = await OV.getDevices();
            var videoDevices = devices.filter(
              (device) => device.kind === 'videoinput'
            );

            // --- 5) Get your own camera stream ---

            // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
            // element: we will manage it on our own) and with the desired properties
            let publisher = OV.initPublisher(initUserData.myUserName, {
              audioSource: false, // The source of audio. If undefined default microphone
              // videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
              videoSource: 'screen', // The source of video. If undefined default webcam
              publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
              publishVideo: true, // Whether you want to start publishing with your video enabled or not
              resolution: '640x480', // The resolution of your video
              frameRate: 30, // The frame rate of your video
              insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
              mirror: false, // Whether to mirror your local video or not
            });

            // --- 6) Publish your stream ---
            mySession.publish(publisher);

            // Set the main video in the page to display our webcam and store our Publisher
            setPublisher(publisher);
          })
          .catch((error) => {
            console.log(
              'There was an error connecting to the session:',
              error.code,
              error.message
            );
          });
      });
    }
  }, [session]);

  useEffect(() => {
    if (sessionForScreen) {
      const mySession = sessionForScreen;

      mySession.on('streamCreated', (event) => {
        console.log('>>>>>>>>>>>>>>>>>>> screenshareCreated');
        const newSubscriber = mySession.subscribe(
          event.stream,
          JSON.parse(event.stream.connection.data).clientData
        );
        setMainStreamManager(newSubscriber);
        // 다른사람이 화면 공유할 때, 내가 화면 공유 중이라면 종료
        // if (isScreenSharing) {
        //   console.log('session 종료');
        //   leaveScreenSharingSession();
        //   joinSessionForScreenShare();
        // }
        console.log(event);
      });

      mySession.on('streamDestroyed', (event) => {
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>> screenShareStopped');
        console.log(event);
      });

      getTokenForScreenShare().then((token: any) => {
        mySession.connect(token.data.token, {
          clientData: initUserData.myUserName,
        });
      });
    }
  }, [sessionForScreen]);

  useEffect(() => {
    if (!isScreenSharing) {
      stopScreenShare();
    } else {
      startScreenShare();
    }
  }, [isScreenSharing]);

  const joinSession = () => {
    // --- 1) Get an OpenVidu object ---
    const newOV = new OpenVidu();
    newOV.enableProdMode();
    setOV(newOV);
    // const session = newOV.initSession();
    // console.log(session);

    // --- 2) Init a session ---
    setSession(newOV.initSession());
  };

  const joinSessionForScreenShare = () => {
    // --- 1) Get an OpenVidu object ---
    const newOV = new OpenVidu();
    newOV.enableProdMode();
    setOVForScreen(newOV);
    // const session = newOV.initSession();
    // console.log(session);

    // --- 2) Init a session ---
    setSessionForScreen(newOV.initSession());
  };

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
    setOV(null);
    setSession(undefined);
    setMainStreamManager(undefined);
    setPublisher(undefined);
    setSubscribers([]);
  };

  const leaveScreenSharingSession = () => {
    if (!sessionForScreen) return;
    const mySession = sessionForScreen;

    mySession.disconnect();

    setOVForScreen(null);
    setSessionForScreen(undefined);
    setScreenPublisher(undefined);
    setScreenSubscriber(undefined);
    setSubscribersForScreenShare([]);
  };

  const getToken = async () => {
    return createSession(initUserData.mySessionId).then((sessionId) =>
      createToken(sessionId)
    );
  };

  const getTokenForScreenShare = async () => {
    return createSession(initScreenData.mySessionId).then((sessionId) =>
      createToken(sessionId)
    );
  };

  const startScreenShare = () => {
    const OVForScreenShare = OVForScreen;

    const mySession = sessionForScreen;

    getTokenForScreenShare().then((token: any) => {
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
          let publisher = OVForScreenShare.initPublisher(
            initUserData.myUserName,
            {
              audioSource: false, // The source of audio. If undefined default microphone
              // videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
              videoSource: 'screen', // The source of video. If undefined default webcam
              publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
              publishVideo: true, // Whether you want to start publishing with your video enabled or not
              resolution: '640x480', // The resolution of your video
              frameRate: 30, // The frame rate of your video
              insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
              mirror: true, // Whether to mirror your local video or not
            }
          );

          // --- 6) Publish your stream ---
          mySession.publish(publisher);
          publisher.once('accessAllowed', () => {
            try {
              console.log('startScreenSharing');
              session?.signal({
                type: 'startScreenSharing',
              });
              publisher.stream
                .getMediaStream()
                .getVideoTracks()[0]
                .addEventListener('ended', () => {
                  session?.signal({
                    type: 'stopScreenSharing',
                  });
                  leaveScreenSharingSession();
                });
            } catch (e) {
              console.log('Error applying constraints: ', e);
            }
          });

          publisher.once('accessDenied', () => {
            console.warn('ScreenShare: Access Denied');
          });

          // Set the main video in the page to display our webcam and store our Publisher
          // setMainStreamManager(publisher);
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
    sessionForScreen?.disconnect();
    joinSessionForScreenShare();
  };

  const createSession = (sessionId: any) => {
    return new Promise((resolve, reject) => {
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
            console.log(error);
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

  const createToken = (sessionId: any) => {
    return new Promise((resolve, reject) => {
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
        })
        .catch((error) => reject(error));
    });
  };

  return (
    <MeetingContainer>
      <MeetingInnerContainer>
        <VideosCopy publisher={publisher} subscribers={subscribers} />
        {test && !isScreenSharing && (
          <VideosCopy subscribers={subscribersForScreenShare} />
        )}
        <VideoCopy subscribe={mainStreamManager} />
        <button onClick={() => setIsScreenSharing(!isScreenSharing)}>
          화면공유
        </button>
        <button onClick={deleletAllSession}>세션나가기</button>
      </MeetingInnerContainer>
      <FunctionButtons
        isAudioOn={isAudioOn}
        isVideoOn={isVideoOn}
        setIsAudioOn={setIsAudioOn}
        setIsVideoOn={setIsVideoOn}
        publisher={publisher}
      />
      {!isChatOpen && <ChatButton onClick={onOpenChat} />}
    </MeetingContainer>
  );
};

export default Meeting;
