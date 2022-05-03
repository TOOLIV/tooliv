export type workspaceListType = {
  id: string;
  name: string;
  thumbnailImage: string;
  onClick: (id: string) => void;
};

export type workspaceImgType = {
  file: File;
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
  openMemberList: () => void;
  openAddMemberModal: () => void;
  onClose: () => void;
};

export type workspaceMemberListType = {
  isOpen: boolean;
  onClose: () => void;
};

export type workspaceMemberType = {
  email: string;
  name: string;
  nickname: string;
  workspaceMemberCode: string;
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
