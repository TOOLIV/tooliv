export type workspaceListType = {
  id: string;
  name: string;
  thumbnailImage: string;
};

export type workspaceImgType = {
  onChange: (file: FileList) => void;
};

export type workspacesType = {
  workspaceList: workspaceListType[];
};

export type workspaceType = {
  name: string;
  thumbnailImage: string;
};
