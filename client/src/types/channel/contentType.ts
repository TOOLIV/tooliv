export type contentTypes = {
  roomId: string;
  sender: string;
  contents: string;
  type: string;
  sendTime?: string;
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
  memberList: channelMemberType[];
  onClick: () => void;
  onChange: (keyword: string) => void;
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
