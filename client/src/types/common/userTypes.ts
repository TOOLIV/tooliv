export type userBadgeTypes = {
  name: string;
  email: string;
  onClick: (id: string) => void;
};

export type userItemTypes = {
  name: string;
  email: string;
  userCode: string;
  onDelete: (email: string) => void;
  onChange: (value: string, email: string) => void;
};

export type userListTypes = {
  id: string;
  name: string;
  email: string;
  userCode: string;
};

// 유저 역할 변경 타입(관리자 or 일반)
export type userSelectorTypes = {
  value: string;
  label: string;
};

// 유저 코드 변경 api 타입
export type userCodeTypes = {
  userCode: string;
  email: string;
};

export type userCreationTypes = {
  name: string;
  email: string;
  password: string;
};

export type userLoginTypes = {
  email: string;
  password: string;
};
