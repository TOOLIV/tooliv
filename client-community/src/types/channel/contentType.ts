export type contentTypes = {
  chatId: string;
  channelId: string;
  email: string;
  contents: string;
  type: string;
  deleted: boolean;
  updated: boolean;
  sendTime?: string;
  files?: string[];
  originFiles?: string[];
  isSearched?: boolean;
};

export type channelRadioTypes = {
  value: string;
  onChange: (value: string) => void;
};

export type visibilityRadioTypes = {
  value: boolean;
  onChange: (value: boolean) => void;
};

export type channelListTypes = {
  channelCode: string;
  description: string;
  id: string;
  name: string;
  privateYn: boolean;
  readYn: boolean;
};
export type channelTypes = {
  channelCode: string;
  description: string;
  workspaceId: string;
  name: string;
  privateYn: boolean;
};

export type channelsType = {
  normalChannelList: channelListTypes[];
  videoChannelList: channelListTypes[];
  listNum: number;
  onClick: (id: string) => void;
};

export type channelMemberListType = {
  isOpen: boolean;
  onClick: () => void;
  onClose: () => void;
};

export type channelMemberType = {
  email: string;
  name: string;
  nickname: string;
  profileImage: string;
  channelMemberCode: string;
  statusCode: string;
};

export type addMemberType = {
  isOpen: boolean;
  onClose: () => void;
  channelId: string;
};

export type channelDropdownType = {
  isOpen: boolean;
  openCreateChannelModal: () => void;
  openPublicChannelListModal: () => void;
  onClose: () => void;
};

export type exitChannelModalType = {
  isOpen: boolean;
  channelId: string;
  top: number;
  left: number;
};

export type channelHeaderDropdownType = {
  isOpen: boolean;
  onClose: () => void;
  onClick: () => void;
};

export type channelModifyModalType = {
  isOpen: boolean;
  onClose: () => void;
  channelName: string;
};

export type publicChannelType = {
  channelCode: string;
  id: string;
  name: string;
  privateYn: boolean;
};

export type modifyChannelType = {
  id: string;
  name: string;
};

export type channelNotiType = {
  channelId: string;
  workspaceId?: string;
  notificationRead: boolean;
};
