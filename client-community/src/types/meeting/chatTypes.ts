export type chatTypes = {
  name: string;
  timestamp: string;
  content: string;
};

export type chatItemPropsTypes = {
  data: chatTypes;
};

export type chatButtonPropsTypes = {
  onClick: () => void;
};
