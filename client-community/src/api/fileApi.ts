import { multipartInstance } from 'services/axios';

export const fileUpload = async (files: FormData) => {
  return await multipartInstance.post(`/fileUpload`, files);
};
