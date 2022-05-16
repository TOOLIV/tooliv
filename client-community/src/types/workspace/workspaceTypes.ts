export type workspaceListType = {
  id: string;
  name: string;
  thumbnailImage: string;
  noti?: boolean;
  onClick: (id: string) => void;
};

export type workspaceImgType = {
  file: File;
  thumbnailImage?: string;
  onChange: (file: FileList) => void;
};

export type workspacesType = {
  workspaceList: workspaceListType[];
  onClick: (id: string) => void;
};

export type workspaceType = {
  name: string;
  thumbnailImage: string;
};

export type workspaceModalType = {
  isOpen: boolean;
  onClose: () => void;
};

export type workspaceDropdownType = {
  isOpen: boolean;
  userCode: string;
  openMemberList: () => void;
  openAddMemberModal: () => void;
  openModifyModal: () => void;
  onClose: () => void;
};
export type workspaceModifyModalType = {
  isOpen: boolean;
  onClose: () => void;
  workspaceName: string;
  thumbnailImage: string;
};
export type workspaceMemberListType = {
  isOpen: boolean;
  onClose: () => void;
};

export type tutorialModalType = {
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  progress: number;
};

export type workspaceMemberType = {
  email: string;
  name: string;
  nickname: string;
  profileImage: string;
  workspaceMemberCode: string;
  statusCode: string;
};

export type addWorkspaceMemberType = {
  isOpen: boolean;
  onClose: () => void;
};

export type inviteMembersType = {
  emailList: string[];
};

export type deleteMembersType = {
  email: string;
};

export type inviteMembersBadgeType = {
  name: string;
  email: string;
};
