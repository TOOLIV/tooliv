import instance from 'services/axios';

export const fileUpload = async (files: FormData) => {
  return await instance.post(`/fileUpload`, files);
};

export const fileList = async (channelId: string) => {
  console.log(channelId);
  return await instance.get(`/fileList/${channelId}`);
}