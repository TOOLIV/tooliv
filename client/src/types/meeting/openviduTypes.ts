import { Publisher, Session, StreamManager } from 'openvidu-browser';
import { Dispatch, SetStateAction } from 'react';


export type videosTypes = {
  publisher: Publisher;
  subscribers: Array<StreamManager>;
  isScreen: boolean;
};

export type publisherVideoPropsType = {
  publisher: Publisher;
  rowCnt : number;
  colCnt : number;
  isScreenSharing: boolean;
}

export type subscriberVideoPropsType = {
  subscriber: StreamManager;
  rowCnt : number;
  colCnt : number;
  isScreenSharing: boolean
}

export type funcButtonPropsTypes = {
  publisher?: Publisher;
  isAudioOn: boolean;
  isVideoOn: boolean;
  isScreenSharing: boolean;
  setIsAudioOn: Dispatch<SetStateAction<boolean>>;
  setIsVideoOn: Dispatch<SetStateAction<boolean>>;
  setIsScreenSharing: Dispatch<SetStateAction<boolean>>;
  leaveSession: () => void;
  // setIsScreenShareModal: Dispatch<SetStateAction<boolean>>;
};

export type screenShareMadalPropsTypes = {
  setIsScreenShareModal: Dispatch<SetStateAction<boolean>>;
  setChoiceScreen: Dispatch<SetStateAction<string>>;
};
