export type userBadgeTypes = {
  name: string;
  email: string;
  onDelete: (id: string) => void;
};

export type userInfoType = {
  name: string;
  email: string;
  nickname: string;
  profileImage: string;
  statusCode: string;
};
export type userItemTypes = {
  name: string;
  email: string;
  nickname: string;
  profileImage: string;
  userCode: string;
  statusCode: string;
  onDelete: (email: string) => void;
  onChange: (value: string, email: string) => void;
};

export type userListTypes = {
  id: string;
  name: string;
  nickname: string;
  profileImage: string;
  email: string;
  userCode: string;
  statusCode: string;
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

export type userLogTypes = {
  [key: string]: string;
};

export type userDropdownType = {
  isOpen: boolean;
  onClose: () => void;
  openProfileConfig: () => void;
};

export type userConfigType = {
  isOpen: boolean;
  onClose: () => void;
};

export type userNicknameType = {
  nickname: string;
};

export type userDirectMessageType = {
  isOpen: boolean;
  onClose: () => void;
};

export type userStatusType = {
  statusCode: string;
};

export type usersStatusType = {
  emailList: string[];
};

export type userStatusInfoType = {
  [key: string]: string;
};
