import instance from '../services/axios';
import { userCodeTypes, userCreationTypes } from '../types/common/userTypes';

export const findUser = async (keyword: string) => {
  console.log(keyword);
  const response = await instance.get(`/admin/search?keyword=${keyword}`);
  return response;
};

export const changeCode = async (body: userCodeTypes) => {
  const response = await instance.patch(`/admin/code`, body);
  return response;
};

export const createUser = async (body: userCreationTypes) => {
  const response = await instance.post(`/admin/user`, body);
  return response;
};

export const checkUserEmail = async (email: string) => {
  const response = await instance.get(`/admin/check/${email}`);
  return response;
};
