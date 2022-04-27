export type workspaceListType = {
  id: string;
  name: string;
  thumbnailImage: string;
  onClick: (id: string) => void;
};

export type workspaceImgType = {
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
