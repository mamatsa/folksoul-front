import { axiosInstance } from 'services';

export const loginRequest = async (nickname: string, password: string) => {
  const res = await axiosInstance.post('/login', {
    nickname,
    password,
  });

  return res.data;
};

export const getBandMembersRequest = async () => {
  const res = await axiosInstance.get('/band-members');

  return res.data;
};

export const putMemberAvatarRequest = async (memberId: string, image: any) => {
  const formData = new FormData();
  formData.append('image', image);
  const res = await axiosInstance.put(
    `/band-member/avatar/${memberId}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );

  return res.data;
};
