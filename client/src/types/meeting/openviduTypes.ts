import { Publisher, Session, StreamManager } from 'openvidu-browser';
import { Dispatch, SetStateAction } from 'react';

export type openviduTypes = {
  mySessionId: string;
  myUserName: string;
  session: undefined | Session;
};

export type videosTypes = {
  publisher?: Publisher;
  subscribers?: Array<StreamManager> | any;
};
export type videoTypes = {
  publisher?: Publisher;
  subscribers?: Array<StreamManager> | any;
};

export type funcButtonPropsTypes = {
  publisher?: Publisher;
  setIsScreenShareModal: Dispatch<SetStateAction<boolean>>;
};

export type screenShareMadalPropsTypes = {
  setIsScreenShareModal: Dispatch<SetStateAction<boolean>>;
};
