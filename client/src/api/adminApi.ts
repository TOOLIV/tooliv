import instance from '../services/axios';
import { userCodeTypes, userCreationTypes } from '../types/common/userTypes';

export const findUser = async (keyword: string, sequence: number) => {
  const response = await instance.get(
    `/admin/search?keyword=${keyword}&sequence=${sequence}`
  );
  return response;
};

export const changeCode = async (body: userCodeTypes) => {
  const response = await instance.patch(`/admin/code`, body);
  return response;
};

export const createUser = async (body: userCreationTypes) => {
  const response = await instance.post(`/admin`, body);
  return response;
};

export const checkUserEmail = async (email: string) => {
  const response = await instance.get(`/admin/check/${email}`);
  return response;
};

export const deleteUser = async (email: string) => {
  const response = await instance.delete(`/admin?email=${email}`);
  return response;
};

export const getTotalUserNum = async () => {
  const response = await instance.get(`/admin/total`);
  return response;
};
