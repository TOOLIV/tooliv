import instance from 'services/axios';

export const reserveMessage = async (body: any) => {
  return await instance.post(`/reservation`, body);
};
