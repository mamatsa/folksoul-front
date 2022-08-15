import { axiosInstance } from 'services';

export const loginRequest = async (nickname: string, password: string) => {
  const res = await axiosInstance.post('/login', {
    nickname,
    password,
  });

  return res.data;
};
