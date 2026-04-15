import { axiosInstance } from './axiosInstance';

export interface User {
  username: string;
}

export const getUser = async () => {
  try {
    const response = await axiosInstance.get<{ user: User }>('/auth/user');
    const { user } = response.data;
    return user;
  } catch {
    return null;
  }
};

export const login = async (code: string) => {
  const response = await axiosInstance.post<{ user: User }>('/auth/login', {
    code,
  });
  const { user: authenticatedUser } = response.data;
  return authenticatedUser;
};
