import instance from '../services/axios';
import { userCreationTypes, userLoginTypes } from '../types/common/userTypes';

export const login = async (body: userLoginTypes) => {
  const response = await instance.post(`/user/login`, body);
  const user = {
    name: response.data.name,
    accessToken: response.data.accessToken,
    nickname: response.data.nickname,
    email: response.data.email,
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
