import instance from 'services/axios';

export const enterChannel = async (channelId?: string) => {
  return instance.post(`/chat/channel/${channelId}`);
};

export const subChannel = async (channelId?: string) => {
  return instance.get(`/chat/channel/${channelId}`);
};
