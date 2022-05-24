import instance from 'services/axios';

export const enterChannel = async (channelId?: string) => {
  return instance.post(`/channel/chat/${channelId}`);
};

export const subChannel = async (channelId?: string) => {
  return instance.get(`/channel/chat/${channelId}`);
};

export const getChannels = async (email?: string) => {
  return instance.get(`/notification/list/${email}`);
};

export const enterDM = async (roomId?: string) => {
  return instance.post(`/direct/enter/${roomId}`);
};

export const subDM = async (roomId?: string) => {
  return instance.get(`/direct/chat/${roomId}`);
};

export const createDMRoom = async (receiverEmail?: string) => {
  return instance.post(`/direct/chat/${receiverEmail}`);
};

export const getDMList = async (email?: string) => {
  return instance.get(`/direct/${email}`);
};

export const searchChat = async (
  searchContent?: string,
  channelId?: string
) => {
  return instance.get(`/search/chat/content`, {
    params: { searchContent, channelId },
  });
};

export const updateLoggedTime = async (channelId?: string, type?: string) => {
  return instance.post(`/notification/update`, { channelId, type });
};

export const createWebHook = async (
  channelId: string,
  name: string,
  senderId: string
) => {
  return instance.post(`/webhook`, {
    channelId: channelId,
    name: name,
    senderId: senderId,
  });
};

export const getWebHookList = async (channelId: string) => {
  return instance.get(`/webhook/list/${channelId}`);
};
