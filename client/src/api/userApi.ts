import instance from '../services/axios';
import {
  userCreationTypes,
  userLoginTypes,
  userNicknameType,
} from '../types/common/userTypes';

export const login = async (body: userLoginTypes) => {
  const response = await instance.post(`/user/login`, body);
  const user = {
    name: response.data.name,
    accessToken: response.data.accessToken,
    nickname: response.data.nickname,
    email: response.data.email,
    profileImage: response.data.profileImage,
  };

  localStorage.setItem('tooliv_info', JSON.stringify(user));
  if (response.data.userCode === 'ADMIN')
    localStorage.setItem('isAdmin', JSON.stringify(true));
  else localStorage.removeItem('isAdmin');

  return response;
};

export const join = async (body: userCreationTypes) => {
  const response = await instance.post(`/user`, body);
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
