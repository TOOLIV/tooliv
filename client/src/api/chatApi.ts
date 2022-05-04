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
