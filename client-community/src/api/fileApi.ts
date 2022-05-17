import instance from 'services/axios';

export const fileUpload = async (files: FormData) => {
  return await instance.post(`/fileUpload`, files);
};
