import instance from 'services/axios';

export const enterChannel = async (channelId: string) => {
  return instance.post(`/chat/room/${channelId}`);
};

export const subChannel = async (channelId: string) => {
  return instance.get(`/chat/room/${channelId}`);
};
