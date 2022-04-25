import styled from '@emotion/styled';
import axios from 'axios';
import { OpenVidu, Session, StreamManager } from 'openvidu-browser';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import Video from '../../../molecules/meeting/Video';
import { isOpenChat } from '../../../recoil/atom';
import { openviduTypes } from '../../../types/meeting/openviduTypes';

const VideoContainer = styled.div<{ isChatOpen: boolean }>`
  display: flex;
  flex-wrap: wrap;
  place-items: center;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: inherit;
  height: calc(100vh - 210px);
  /* background-color: #121212; */
`;

// const Video = styled.div`
//   width: 10vw;
//   height: 10vh;
//   background-color: black;
//   border-radius: 10px;
// `;

const Videos = () => {
  const isChatOpen = useRecoilValue(isOpenChat);

  // const OPENVIDU_SERVER_URL = 'https://' + window.location.hostname + ':4443';
  const OPENVIDU_SERVER_URL = 'https://localhost:4443';
  const OPENVIDU_SERVER_SECRET = 'MY_SECRET';

  const [isOV, setIsOV] = useState(false);
  const [OV, setOV] = useState<OpenVidu | null>();
  const [openviduState, setOpenviduState] = useState<openviduTypes>({
    mySessionId: 'SessionA',
    myUserName: 'tooliv' + new Date().getMilliseconds,
    session: undefined,
    mainStreamManager: undefined,
    publisher: undefined,
    subscribers: [],
    currentVideoDevice: undefined,
  });

  useEffect(() => {
    window.addEventListener('beforeunload', onbeforeunload);
    console.log('hello');
    return () => {
      window.removeEventListener('beforeunload', onbeforeunload);
    };
  }, []);

  // componentDidMount() {
  //   window.addEventListener("beforeunload", this.onbeforeunload);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener("beforeunload", this.onbeforeunload);
  // }

  const onbeforeunload = (event: any) => {
    leaveSession();
  };

  // handleChangeSessionId(e) {
  //   this.setState({
  //     mySessionId: e.target.value,
  //   });
  // }

  // handleChangeUserName(e) {
  //   this.setState({
  //     myUserName: e.target.value,
  //   });
  // }

  // handleMainVideoStream(stream) {
  //   if (this.state.mainStreamManager !== stream) {
  //     this.setState({
  //       mainStreamManager: stream,
  //     });
  //   }
  // }

  const deleteSubscriber = (streamManager: StreamManager) => {
    let subscribers = openviduState.subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      setOpenviduState({
        ...openviduState,
        subscribers: subscribers,
      });
    }
  };

  useEffect(() => {
    if (!isOV) {
      beforeJoinSession();
      setIsOV(true);
    } else joinSession();
  }, [isOV]);

  const beforeJoinSession = () => {
    // --- 1) Get an OpenVidu object ---
    const OV = new OpenVidu();
    setOV(OV);

    // --- 2) Init a session ---
    setOpenviduState({
      ...openviduState,
      session: OV.initSession(),
    });

    console.log(OV, openviduState.session);
  };

  const joinSession = () => {
    const p = () => {
      var mySession: Session;
      if (!!openviduState.session) mySession = openviduState.session;
      else return;
      // --- 3) Specify the actions when events take place in the session ---

      // On every new Stream received...
      mySession.on('streamCreated', (event: any) => {
        // Subscribe to the Stream to receive it. Second parameter is undefined
        // so OpenVidu doesn't create an HTML video by its own
        var subscriber = mySession.subscribe(event.stream, '');
        var subscribers = openviduState.subscribers;
        subscribers.push(subscriber);

        // Update the state with the new subscribers
        setOpenviduState({
          ...openviduState,
          subscribers: subscribers,
        });
      });

      // On every Stream destroyed...
      mySession.on('streamDestroyed', (event: any) => {
        // Remove the stream from 'subscribers' array
        deleteSubscriber(event.stream.streamManager);
      });

      // On every asynchronous exception...
      mySession.on('exception', (exception: any) => {
        console.warn(exception);
      });

      // --- 4) Connect to the session with a valid user token ---

      // 'getToken' method is simulating what your server-side should do.
      // 'token' parameter should be retrieved and returned by your own backend
      const connect = async (OV: OpenVidu) => {
        getToken().then((token: any) => {
          // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
          // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
          mySession
            .connect(token, { clientData: openviduState.myUserName })
            .then(async () => {
              var devices = await OV.getDevices();
              console.log('devices>>>>>>>>>>', devices);
              var videoDevices = devices.filter(
                (device) => device.kind === 'videoinput'
              );

              // --- 5) Get your own camera stream ---

              // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
              // element: we will manage it on our own) and with the desired properties
              let publisher = OV.initPublisher(openviduState.myUserName, {
                audioSource: undefined, // The source of audio. If undefined default microphone
                videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
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
              setOpenviduState({
                ...openviduState,
                currentVideoDevice: videoDevices[0],
                mainStreamManager: publisher,
                publisher: publisher,
              });
            })
            .catch((error: any) => {
              console.log(
                'There was an error connecting to the session:',
                error.code,
                error.message
              );
            });
        });
      };
      if (OV) connect(OV);
    };
    p();
  };

  const leaveSession = () => {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

    const mySession = openviduState.session;

    if (mySession) {
      mySession.disconnect();
    }

    // Empty all properties...
    setOV(null);
    setOpenviduState({
      session: undefined,
      subscribers: [],
      mySessionId: 'SessionA',
      myUserName: 'Participant' + Math.floor(Math.random() * 100),
      mainStreamManager: undefined,
      publisher: undefined,
      currentVideoDevice: undefined,
    });
  };

  //   const switchCamera = async() => {
  //     try {
  //       const devices = await OV.getDevices();
  //       var videoDevices = devices.filter(
  //         (device) => device.kind === "videoinput"
  //       );

  //       if (
  //         videoDevices &&
  //         videoDevices.length > 1 &&
  //         openviduState.currentVideoDevice.deviceId
  //       ) {
  //         var newVideoDevice = videoDevices.filter(
  //           (device) =>
  //             device.deviceId !== openviduState.currentVideoDevice.deviceId
  //         );

  //         if (newVideoDevice.length > 0) {
  //           // Creating a new publisher with specific videoSource
  //           // In mobile devices the default and first camera is the front one
  //           var newPublisher = OV.initPublisher(undefined, {
  //             videoSource: newVideoDevice[0].deviceId,
  //             publishAudio: true,
  //             publishVideo: true,
  //             mirror: true,
  //           });

  //           //newPublisher.once("accessAllowed", () => {
  //           await openviduState.session.unpublish(
  //             openviduState.mainStreamManager
  //           );

  //           await openviduState.session.publish(newPublisher);
  //           setOpenviduState({
  //             ...openviduState,
  //             currentVideoDevice: newVideoDevice,
  //             mainStreamManager: newPublisher,
  //             publisher: newPublisher,
  //           });
  //         }
  //       }
  //     } catch (e) {
  //       console.error(e);
  //     }
  // }

  const getToken = async () => {
    return createSession(openviduState.mySessionId).then((sessionId) =>
      createToken(sessionId)
    );
  };

  const createSession = (sessionId: string) => {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({ customSessionId: sessionId });
      axios
        .post(OPENVIDU_SERVER_URL + '/openvidu/api/sessions', data, {
          headers: {
            Authorization:
              'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json',
          },
        })
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
                OPENVIDU_SERVER_URL
            );
            if (
              window.confirm(
                'No connection to OpenVidu Server. This may be a certificate error at "' +
                  OPENVIDU_SERVER_URL +
                  '"\n\nClick OK to navigate and accept it. ' +
                  'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                  OPENVIDU_SERVER_URL +
                  '"'
              )
            ) {
              window.location.assign(
                OPENVIDU_SERVER_URL + '/accept-certificate'
              );
            }
          }
        });
    });
  };

  const createToken = (sessionId: any) => {
    return new Promise((resolve, reject) => {
      var data = {};
      axios
        .post(
          OPENVIDU_SERVER_URL +
            '/openvidu/api/sessions/' +
            sessionId +
            '/connection',
          data,
          {
            headers: {
              Authorization:
                'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
              'Content-Type': 'application/json',
            },
          }
        )
        .then((response) => {
          console.log('TOKEN', response);
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  };

  return (
    <div>
      <VideoContainer isChatOpen={isChatOpen}>
        <Video openviduState={openviduState} />
        {/* <Video />
        <Video />
        <Video /> */}
      </VideoContainer>
      {/* <button onClick={leaveSession} /> */}
    </div>
  );
};

export default Videos;
