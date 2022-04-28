import { channelTypes } from 'types/channel/contentType';
import instance from '../services/axios';

export const getChannelList = async (workspaceId: string) => {
  const response = await instance.get(`/channel/list/${workspaceId}`);
  console.log(response);
  return response;
};

export const createChannel = async (body: channelTypes) => {
  const response = await instance.post(`/channel`, body);
  console.log(response);
  return response;
};
