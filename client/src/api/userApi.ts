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

  localStorage.setItem('user', JSON.stringify(user));
  if (response.data.userCode === 'ADMIN')
    localStorage.setItem('isAdmin', JSON.stringify(true));
  else localStorage.removeItem('isAdmin');

  console.log(response);
  return response;
};

export const join = async (body: userCreationTypes) => {
  const response = await instance.post(`/user`, body);
  console.log(response);
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
