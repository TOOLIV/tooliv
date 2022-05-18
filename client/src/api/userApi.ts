import instance from '../services/axios';
import {
  userCreationTypes,
  userLoginTypes,
  userNicknameType,
  userPwdType,
  usersStatusType,
  userStatusType,
} from '../types/common/userTypes';

export const login = async (body: userLoginTypes) => {
  const response = await instance.post(`/user/login`, body);
  const user = {
    name: response.data.name,
    accessToken: response.data.accessToken,
    nickname: response.data.nickname,
    email: response.data.email,
    profileImage: response.data.profileImage,
    statusCode: response.data.statusCode,
  };

  localStorage.setItem('tooliv_info', JSON.stringify(user));
  return response;
};

export const updateNickname = async (body: userNicknameType) => {
  const response = await instance.patch(`/user`, body);
  return response;
};

export const updateProfileImage = async (body: any) => {
  const response = await instance.post(`/user/image`, body);
  return response;
};

export const getUserList = async (keyword: string, sequence: number) => {
  const response = await instance.get(
    `/user/search?keyword=${keyword}&sequence=${sequence}`
  );
  return response;
};

export const getUserInfo = async (email: string) => {
  const response = await instance.get(`user/info/${email}`);
  return response;
};

export const updateUserStatus = async (body: userStatusType) => {
  const response = await instance.patch(`user/status`, body);
  return response;
};

export const getUserStatus = async (body: usersStatusType) => {
  const response = await instance.post(`user/status`, body);
  return response;
};

export const changeUserPwd = async (body: userPwdType) => {
  const response = await instance.patch(`user/password`, body);
  return response;
};
