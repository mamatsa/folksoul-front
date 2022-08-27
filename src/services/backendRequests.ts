import { axiosInstance } from 'services';
import { BandMemberInputs } from 'types';

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

export const getBandMemberRequest = async (id: string) => {
  const res = await axiosInstance.get('/band-member/' + id);

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

export const postBandMemberRequest = async (data: BandMemberInputs) => {
  const res = await axiosInstance.post('/band-member', data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  return res.data;
};

export const putBandMemberRequest = async (
  id: string,
  data: BandMemberInputs
) => {
  const res = await axiosInstance.put('/band-member/' + id, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  return res.data;
};
