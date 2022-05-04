import { atom } from 'recoil';
import { FileTypes } from 'types/common/fileTypes';
import { contentTypes } from '../types/channel/contentType';
import { ThemeMode } from '../types/common/themeTypes';
import { userCreationTypes, userLogTypes } from '../types/common/userTypes';

export const appThemeMode = atom<ThemeMode>({
  key: 'AppThemeMode',
  default: 'light',
});

export const isOpenSide = atom<boolean>({
  key: 'IsOpenSide',
  default: true,
});

export const isOpenChat = atom<boolean>({
  key: 'IsChatOpen',
  default: false,
});

export const channelMessage = atom<string>({
  key: 'ChannelMessage',
  default: '',
});

export const channelContents = atom<contentTypes[]>({
  key: 'ChannelContents',
  default: [],
});

export const userCreationList = atom<userCreationTypes[]>({
  key: 'userCreationList',
  default: [],
});

export const chatFileUrl = atom<string[]>({
  key: 'chatFileUrl',
  default: [],
});

export const chatFileNames = atom<string[]>({
  key: 'chatFilesName',
  default: [],
});

export const currentWorkspace = atom<string>({
  key: 'currentWorkspace',
  default: 'main',
});

export const currentChannel = atom<string>({
  key: 'currentChannel',
  default: '',
});
export const modifyChannelName = atom<string>({
  key: 'modifyChannelName',
  default: '',
});

export const currentChannelNum = atom<number>({
  key: 'currentChannelNum',
  default: 0,
});

export const userLog = atom<userLogTypes>({
  key: 'userLog',
  default: {},
});

export const isDragging = atom<boolean>({
  key: 'isDragging',
  default: false,
});

export const chatFiles = atom<FileTypes[]>({
  key: 'chatFiles',
  default: [],
});
