import { Device, Publisher, StreamManager } from 'openvidu-browser';
import { Dispatch, SetStateAction } from 'react';

export type openviduTypes = {
  mySessionId: string;
  myUserName: string;
  currentVideoDevice: undefined | Device;
  session: undefined | any;
  mainStreamManager: undefined | any;
  publisher: undefined | any;
  subscribers: Array<any> | any;
};

export type videoTypes = {
  openviduState: openviduTypes;
  streamManager?: StreamManager;
};

export type funcButtonPropsTypes = {
  publisher: Publisher;
  setIsScreenShareModal: Dispatch<SetStateAction<boolean>>;
};

export type screenShareMadalPropsTypes = {
  setIsScreenShareModal: Dispatch<SetStateAction<boolean>>;
};
