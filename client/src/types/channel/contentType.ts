export type contentTypes = {
  channelId: string;
  sender: string;
  contents: string;
  type: string;
  sendTime: string;
  files?: string[];
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
};
export type channelTypes = {
  channelCode: string;
  description: string;
  workspaceId: string;
  name: string;
  privateYn: boolean;
};

export type channelsType = {
  channelList: channelListTypes[];
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
  channelMemberCode: string;
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
