import { AxiosResponse } from 'axios';
import { api } from '..';
import { UserInterface } from '../../components';

export const getUsers = () =>
  api.get<AxiosResponse>(`users`).then((res) => res.data);

export const getUser = (id: string) =>
  api.get<AxiosResponse>(`users/${id}`).then((res) => res.data);

export const addUser = (payload: UserInterface) =>
  api.post<AxiosResponse>(`users`, payload).then((res) => res.data);

export const editUser = (id: string, payload: Partial<UserInterface>) =>
  api.put<AxiosResponse>(`users/${id}`, payload).then((res) => res.data);

export const deleteUser = (id: string) => api.delete(`users/${id}`);

export const generateTeam = (payload: UserInterface) =>
  api
    .post<AxiosResponse>(`users/generateTeam`, payload)
    .then((res) => res.data);
