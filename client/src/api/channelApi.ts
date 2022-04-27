import instance from '../services/axios';

export const getChannelList = async (workspaceId: string) => {
  const response = await instance.get(`/channel/list/${workspaceId}`);
  console.log(response);
  return response;
};
