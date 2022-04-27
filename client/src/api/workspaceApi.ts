import instance from '../services/axios';

export const getWorkspaceList = async () => {
  const response = await instance.get(`/workspace/list`);
  console.log(response);
  return response;
};
