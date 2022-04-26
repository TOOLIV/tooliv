import instance from '../services/axios';
import { userLoginTypes } from '../types/common/userTypes';

export const login = async (body: userLoginTypes) => {
  console.log(body);
  const response = await instance.post(`/user/login`, body);
  const user = {
    name: response.data.name,
    accessToken: response.data.accessToken,
  };

  sessionStorage.setItem('user', JSON.stringify(user));
  if (response.data.userCode === 'ADMIN')
    sessionStorage.setItem('isAdmin', JSON.stringify(true));
  else sessionStorage.removeItem('isAdmin');

  console.log(response);
  return response;
};

export const join = async (body: userLoginTypes) => {
  console.log(body);
  const response = await instance.post(`/user/login`, body);
  console.log(response);
  return response;
};
