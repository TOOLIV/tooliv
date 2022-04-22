export type userBadgeTypes = {
  name: string;
  email: string;
  onClick: () => void;
};

export type userItemTypes = {
  name: string;
  email: string;
  userCode: string;
  selected: { value: string; label: string };
  onChange: any;
  onClick: () => void;
};
