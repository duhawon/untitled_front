import api from './axiosInstance';

export const presignUserProfileApi = ({ contentType, originalFileName }) => {
  return api.post('/uploads/users/profile/presign', {
    contentType,
    originalFileName,
  });
};

export const updateMyProfileImageApi = (profileImgKey) => {
  return api.put('/users/me/profile-img', {
    profileImgKey,
  });
};