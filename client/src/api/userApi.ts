import instance from '../services/axios';

export const findUser = async (keyword: string) => {
  console.log(keyword);
  const response = await instance.get(`/admin/list/user?keyword=${keyword}`);
  console.log(response);
};
