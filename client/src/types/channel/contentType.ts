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
