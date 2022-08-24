import { axiosInstance } from 'services';

export const loginRequest = async (nickname: string, password: string) => {
  const res = await axiosInstance.post('/login', {
    nickname,
    password,
  });

  return res.data;
};

export const getBandMembersRequest = async () => {
  const res = await axiosInstance.get('/band-members', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  return res.data;
};
