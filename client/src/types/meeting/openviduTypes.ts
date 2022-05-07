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
  publisher: Publisher;
  isAudioOn: boolean;
  isVideoOn: boolean;
  setIsAudioOn: Dispatch<SetStateAction<boolean>>;
  setIsVideoOn: Dispatch<SetStateAction<boolean>>;
  doScreenSharing: boolean;
  setDoStartScreenSharing: Dispatch<SetStateAction<boolean>>;
  setDoStopScreenSharing: Dispatch<SetStateAction<boolean>>;
};

export type screenShareMadalPropsTypes = {
  setIsScreenShareModal: Dispatch<SetStateAction<boolean>>;
  setChoiceScreen: Dispatch<SetStateAction<string>>;
  setDoStartScreenSharing: Dispatch<SetStateAction<boolean>>;
};
