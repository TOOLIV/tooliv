import {
  deleteMembersType,
  inviteMembersType,
} from 'types/workspace/workspaceTypes';
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

export const inviteWorkspaceMember = async (
  workspaceId: string,
  body: inviteMembersType
) => {
  const response = await instance.post(`workspace/${workspaceId}/member`, body);
  return response;
};

export const getWorkspaceInfo = async (workspaceId: string) => {
  const response = await instance.get(
    `workspace/info?workspaceId=${workspaceId}`
  );
  return response;
};

export const deleteWorkspaceMember = async (
  workspaceId: string
  // body: deleteMembersType
) => {
  const response = await instance.delete(`workspace/${workspaceId}/member`);

  return response;
};
