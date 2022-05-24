import { Dispatch, SetStateAction } from "react";

export type fileModalType = {
  onClick: () => void;
};

export type fileListModalPropsType = {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  channelId: string;
}