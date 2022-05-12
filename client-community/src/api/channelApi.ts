import { channelTypes, modifyChannelType } from 'types/channel/contentType';
import { inviteMembersType } from 'types/workspace/workspaceTypes';
import instance from '../services/axios';

export const getChannelList = async (workspaceId: string) => {
  const response = await instance.get(`/channel/list/${workspaceId}`);
  return response;
};

export const getPublicChannelList = async (workspaceId: string) => {
  const response = await instance.get(`/channel/list/public/${workspaceId}`);
  return response;
};

export const createChannel = async (body: channelTypes) => {
  const response = await instance.post(`/channel`, body);
  return response;
};

export const searchNotChannelMemberList = async (
  channelId: string,
  keyword: string,
  sequence: number
) => {
  const response = await instance.get(
    `channel/${channelId}/member/list?keyword=${keyword}&seq=${sequence}`
  );
  return response;
};

export const searchChannelMemberList = async (
  channelId: string,
  keyword: string,
  sequence: number
) => {
  const response = await instance.get(
    `channel/${channelId}/member/search?keyword=${keyword}&seq=${sequence}`
  );
  return response;
};

export const inviteChannelMember = async (
  channelId: string,
  body: inviteMembersType
) => {
  const response = await instance.post(`channel/${channelId}/member`, body);
  return response;
};

export const getChannelInfo = async (channelId: string) => {
  const response = await instance.get(`channel/${channelId}/member/info`);
  return response;
};

export const modifyChannel = async (body: modifyChannelType) => {
  const response = await instance.patch(`channel`, body);
  return response;
};

export const deleteChannelMember = async (channelId: string, email: string) => {
  const response = await instance.delete(
    `channel/${channelId}/member?email=${email}`
  );
  return response;
};

export const getChannelUserCode = async (channelId: string) => {
  const response = await instance.get(`channel/${channelId}/member/code`);
  return response;
};
