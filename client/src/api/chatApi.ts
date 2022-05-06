import instance from 'services/axios';

export const enterChannel = async (channelId?: string) => {
  return instance.post(`/chat/channel/${channelId}`);
};

export const subChannel = async (channelId?: string) => {
  return instance.get(`/chat/channel/${channelId}`);
};

export const getChannels = async (email?: string) => {
  return instance.get(`/notification/list/${email}`);
};

export const enterDM = async (channelId?: string) => {
  return instance.post(`/chat/direct/${channelId}`);
};

export const subDM = async (channelId?: string) => {
  return instance.get(`/chat/direct/${channelId}`);
};

export const createDMRoom = async (receiverEmail?: string) => {
  return instance.post(`/chat/directChat/${receiverEmail}`);
};
