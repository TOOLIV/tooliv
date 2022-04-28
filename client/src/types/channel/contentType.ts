export type contentTypes = {
  roomId: string;
  sender: string;
  contents: string;
  type: string;
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
