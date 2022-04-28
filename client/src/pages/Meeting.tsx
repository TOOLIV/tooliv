import styled from '@emotion/styled';
import { createSession, createToken } from 'api/openvidu/session';
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
  const [isChatOpen, setIsChatOpen] = useRecoilState<boolean>(isOpenChat);
  const [isScreenShareModal, setIsScreenShareModal] = useState<boolean>(false);

  const onOpenChat = () => {
    setIsChatOpen(true);
  };

  /*
    임시 userName
  */
  const date: Date = new Date();
  const userName: number = date.getMilliseconds();

  /*
    openvidu 객체 생성 여부 확인 state
  */
  const [isOV, setIsOV] = useState<boolean>(false);
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
  });
  const [publisher, setPubliser] = useState<Publisher>();
  const [subscribers, setSubscribers] = useState<Array<StreamManager>>([]);
  const [screenShare, setScreenShare] = useState<() => void>(() => {});

  /*
    마운트 시: OV객체가 없으면 beforeJoinSession() 호출 => new OpenVidu()
              openviduState의 Session에 initSession() 할당
              OV객체가 존재하면 JoinSession() 호출 => 내 비디오 정보가 등록
    언마운트 시: leaveSession() 호출 => Session에서 나옴
  */
  useEffect(() => {
    if (!isOV) {
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
    const newOV = new OpenVidu();
    setOV(newOV);

    // --- 2) Init a session ---
    setOpenviduState({
      ...openviduState,
      session: newOV.initSession(),
    });
  };

  const deleteSubscriber = (streamManager: StreamManager) => {
    let newSubscribers = subscribers;
    let index = newSubscribers.indexOf(streamManager, 0);
    if (index > -1) {
      newSubscribers.splice(index, 1);
      setSubscribers([...newSubscribers]);
    }
  };

  const joinSession = () => {
    var mySession: Session;
    if (!!openviduState.session) mySession = openviduState.session;
    else return;
    // --- 3) Specify the actions when events take place in the session ---

    // On every new Stream received...
    mySession.on('streamCreated', (event: any) => {
      // Subscribe to the Stream to receive it. Second parameter is undefined
      // so OpenVidu doesn't create an HTML video by its own
      console.log('streamCreated', event);
      var newSubscriber: Subscriber = mySession.subscribe(
        event.stream,
        JSON.parse(event.stream.connection.data).clientData
      );
      var newSubscribers = subscribers;
      newSubscribers.push(newSubscriber);

      // Update the state with the new subscribers
      setSubscribers([...newSubscribers]);
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
    connect(OV, mySession);
  };

  const connect = async (
    OV: OpenVidu | null | undefined,
    mySession: Session
  ) => {
    if (!OV) return;
    getToken().then((token: any) => {
      // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
      // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
      mySession
        .connect(token, { clientData: openviduState.myUserName })
        .then(async () => {
          var devices = await OV.getDevices();
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
            setPubliser(publisher);
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
              // videoSource: 'screen: ' + 'screen:0:0',
            });
            console.log(publisher);
            mySession.publish(publisher);
            setPubliser(publisher);
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

  const leaveSession = (session: Session | undefined) => {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---
    if (session) {
      session.disconnect();
    }
    // Empty all properties...
    setOV(null);
    setOpenviduState({
      ...openviduState,
      session: undefined,
    });
  };

  const getToken = async () => {
    return createSession(openviduState.mySessionId).then((sessionId: any) =>
      createToken(sessionId)
    );
  };

  return (
    <MeetingContainer>
      <MeetingInnerContainer>
        {publisher && (
          <>
            <Videos publisher={publisher} subscribers={subscribers} />
            <FunctionButtons
              publisher={publisher}
              setIsScreenShareModal={setIsScreenShareModal}
            />
          </>
        )}
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
