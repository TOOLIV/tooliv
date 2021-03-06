export type SendMessageProps = {
  channelId?: string;
  chatId?: string;
  email: string;
  message: string;
  fileUrl?: string[];
  fileNames?: string[];
};

export type SendDMProps = {
  accessToken: string;
  channelId?: string;
  email: string;
  message: string;
  fileUrl: string[];
  fileNames: string[];
};

export type DMInfoType = {
  profileImage?: string;
  receiveName: string;
  channelId: string;
  statusCode: string;
  notificationRead: boolean;
  receiverEmail: string;
  senderEmail: string;
};

export type UpdateChatType = {
  isOpen: boolean;
  onClose: () => void;
  contents: string;
  channelId?: string;
  chatId?: string;
  email: string;
};
