import instance from '../services/axios';

export const getWorkspaceList = async () => {
  const response = await instance.get(`/workspace/list`);
  console.log(response);
  return response;
};

export const createWorkspace = async (body: any) => {
  const response = await instance.post(`/workspace`, body);
  console.log(response);
  return response;
};

export const searchNotWorkspaceMemberList = async (
  workspaceId: string,
  keyword: string
) => {
  const response = await instance.get(
    `workspace/${workspaceId}/member/list?keyword=${keyword}`
  );
  return response;
};

export const searchWorkspaceMemberList = async (
  workspaceId: string,
  keyword: string
) => {
  const response = await instance.get(
    `workspace/${workspaceId}/member/search?keyword=${keyword}`
  );
  return response;
};
