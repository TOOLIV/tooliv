import { Device, Publisher } from 'openvidu-browser';

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
};

export type funcButtonPropsTypes = {
  publisher: Publisher;
};
