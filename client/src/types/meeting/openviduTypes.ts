import { Publisher, Session, StreamManager } from 'openvidu-browser';
import { Dispatch, SetStateAction } from 'react';

export type openviduTypes = {
  mySessionId: string;
  myUserName: string;
  session: undefined | Session;
};

export type openviduTypesCopy = {
  mySessionId: string;
  myUserName: string;
  session: undefined | Session;
  mainStreamManager: undefined | StreamManager;
  publisher: undefined | Publisher;
  subscribers: Array<StreamManager>;
};

export type videosTypes = {
  publisher?: Publisher;
  subscribers?: Array<StreamManager>;
  isScreen: boolean;
};
export type videoTypes = {
  publisher?: Publisher;
  subscribers?: StreamManager;
  totalUser: number;
};

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
