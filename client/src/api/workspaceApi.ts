import { inviteMembersType } from 'types/workspace/workspaceTypes';
import instance from '../services/axios';

export const getWorkspaceList = async () => {
  const response = await instance.get(`/workspace/list`);
  return response;
};

export const createWorkspace = async (body: any) => {
  const response = await instance.post(`/workspace`, body);
  console.log(response);
  return response;
};

export const searchNotWorkspaceMemberList = async (
  workspaceId: string,
  keyword: string,
  sequence: number
) => {
  const response = await instance.get(
    `workspace/${workspaceId}/member/list?keyword=${keyword}&seq=${sequence}`
  );
  console.log(response);
  return response;
};

export const searchWorkspaceMemberList = async (
  workspaceId: string,
  keyword: string,
  sequence: number
) => {
  const response = await instance.get(
    `workspace/${workspaceId}/member/search?keyword=${keyword}&seq=${sequence}`
  );
  console.log(response);
  return response;
};

export const inviteWorkspaceMember = async (
  workspaceId: string,
  body: inviteMembersType
) => {
  const response = await instance.post(`workspace/${workspaceId}/member`, body);
  console.log(response);
  return response;
};

export const getWorkspaceInfo = async (workspaceId: string) => {
  const response = await instance.get(
    `workspace/info?workspaceId=${workspaceId}`
  );
  console.log(response);
  return response;
};

export const deleteWorkspaceMember = async (
  workspaceId: string,
  email: string
) => {
  const response = await instance.delete(
    `workspace/${workspaceId}/member?email=${email}`
  );
  console.log(response);
  return response;
};

export const getWorkspaceUserCode = async (workspaceId: string) => {
  const response = await instance.get(`workspace/${workspaceId}/member/code`);
  console.log(response);
  return response;
};

export const modifyWorkspace = async (body: any) => {
  const response = await instance.patch(`workspace`, body);
  console.log(response);
  return response;
};
