import styled from '@emotion/styled';
import axios from 'axios';
import { motion } from 'framer-motion';
import isElectron from 'is-electron';
import {
  OpenVidu,
  Publisher,
  Session,
  StreamManager,
  Subscriber,
} from 'openvidu-browser';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import ChatButton from '../molecules/meeting/ChatButton';
import Chat from '../organisms/meeting/chat/Chat';
import FunctionButtons from '../organisms/meeting/FunctionButtons';
import ScreenShareModal from '../organisms/meeting/video/ScreenShareModal';
import Videos from '../organisms/meeting/video/Videos';
import { isOpenChat } from '../recoil/atom';
import { openviduTypes } from '../types/meeting/openviduTypes';

const MeetingContainer = styled.div`
  /* background-color: #787878; */
`;

const MeetingInnerContainer = styled.div``;

const Meeting = () => {
  const [isChatOpen, setIsChatOpen] = useRecoilState(isOpenChat);
  const [isScreenShareModal, setIsScreenShareModal] = useState<boolean>(false);

  const onOpenChat = () => {
    setIsChatOpen(true);
  };

  /*
    openvidu setting
  */
  // const OPENVIDU_SERVER_URL = 'https://' + window.location.hostname + ':4443';
  const OPENVIDU_SERVER_URL = 'https://k6a402.p.ssafy.io:4443';
  const OPENVIDU_SERVER_SECRET = 'TOOLIV';

  /*
    임시 userName
  */
  const date = new Date();
  const userName = date.getMilliseconds();

  /*
    openvidu 객체 생성 여부 확인 state
  */
  const [isOV, setIsOV] = useState(false);
  const [OV, setOV] = useState<OpenVidu | null>();

  /*
    screen share list
  */
  // const [screenList, setScreenList] = useState<any>();

  /*
    openvidu state
    
    mySessionId: 세션 id => channel UUID
    myUserName: username => video element id => user UUID값
    session: openvidu Session 객체
    mainStreamManager: 클릭했을 때 전체 화면에 띄울 publisher
    publisher: 내 video 정보
    subscribers: 세션에 참가한 구독자 목록
    currentVideoDevice: 현재 연결된 비디오 디바이스
  */
  const [openviduState, setOpenviduState] = useState<openviduTypes>({
    mySessionId: 'SessionD',
    myUserName: 'tooliv' + userName,
    session: undefined,
    mainStreamManager: undefined,
    publisher: undefined,
    subscribers: [],
    currentVideoDevice: undefined,
  });

  /*
    마운트 시: OV객체가 없으면 beforeJoinSession() 호출 => new OpenVidu()
              openviduState의 Session에 initSession() 할당
              OV객체가 존재하면 JoinSession() 호출 => 내 비디오 정보가 등록
    언마운트 시: leaveSession() 호출 => Session에서 나옴
  */
  useEffect(() => {
    if (!isOV) {
      console.log('userName>>>>>>>>>>>>>>>>>>>>>>', openviduState.myUserName);
      beforeJoinSession();
      setIsOV(true);
    } else {
      joinSession();
    }
    return () => {
      leaveSession(openviduState.session);
    };
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
  };

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

  const joinSession = async () => {
    const p = () => {
      var mySession: Session;
      if (!!openviduState.session) mySession = openviduState.session;
      else return;
      // --- 3) Specify the actions when events take place in the session ---

      // On every new Stream received...
      mySession.on('streamCreated', (event: any) => {
        // Subscribe to the Stream to receive it. Second parameter is undefined
        // so OpenVidu doesn't create an HTML video by its own
        console.log('streamCreated', event);
        var subscriber: Subscriber = mySession.subscribe(event.stream, '');
        var subscribers = openviduState.subscribers;
        console.log(subscriber);
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

              let publisher: Publisher;

              if (!isElectron()) {
                publisher = OV.initPublisher(openviduState.myUserName, {
                  // audioSource: undefined, // The source of audio. If undefined default microphone
                  // videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
                  // publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                  // publishVideo: true, // Whether you want to start publishing with your video enabled or not
                  // resolution: '640x480', // The resolution of your video
                  // frameRate: 30, // The frame rate of your video
                  // insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                  // mirror: true, // Whether to mirror your local video or not
                  videoSource: 'screen',
                });
                mySession.publish(publisher);
                setOpenviduState({
                  ...openviduState,
                  currentVideoDevice: videoDevices[0],
                  mainStreamManager: publisher,
                  publisher: publisher,
                });
              }

              // --- 5) Get your own camera stream ---
              // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
              // element: we will manage it on our own) and with the desired properties
              else {
                publisher = OV.initPublisher(openviduState.myUserName, {
                  audioSource: undefined, // The source of audio. If undefined default microphone
                  videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
                  publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                  publishVideo: true, // Whether you want to start publishing with your video enabled or not
                  resolution: '640x480', // The resolution of your video
                  frameRate: 30, // The frame rate of your video
                  insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                  mirror: true, // Whether to mirror your local video or not
                  // videoSource: 'screen: ' + data[0].id,
                });
                mySession.publish(publisher);
                setOpenviduState({
                  ...openviduState,
                  currentVideoDevice: videoDevices[0],
                  mainStreamManager: publisher,
                  publisher: publisher,
                });
              }
              // --- 6) Publish your stream ---
              // mySession.publish(publisher);

              // Set the main video in the page to display our webcam and store our Publisher
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

  const leaveSession = (session: Session) => {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---
    if (session) {
      session.disconnect();
    }

    // Empty all properties...
    setOV(null);
    setOpenviduState({
      ...openviduState,
      session: undefined,
      subscribers: [],
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
    <MeetingContainer>
      <MeetingInnerContainer>
        <Videos
          openviduState={openviduState}
          streamManager={openviduState.subscribers}
        />
        <FunctionButtons
          publisher={openviduState.publisher}
          setIsScreenShareModal={setIsScreenShareModal}
        />
        {!isChatOpen && (
          <>{!isChatOpen && <ChatButton onClick={onOpenChat} />}</>
        )}
        {isScreenShareModal && isElectron() && (
          <ScreenShareModal setIsScreenShareModal={setIsScreenShareModal} />
        )}
      </MeetingInnerContainer>
    </MeetingContainer>
  );
};

export default Meeting;
