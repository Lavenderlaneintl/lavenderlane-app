import apiClient from "../configs/api";
import { removeUndefinedAndNull } from "../helpers";
import { IUserPayload } from "../interfaces/user.interfaces";

export function UpdateProfileByEmail({
  email,
  payload,
}: {
  email: string;
  payload: Partial<IUserPayload>;
}) {
  return apiClient
    .put<any>(`/users/update?email=${email}`, payload)
    .then((response) => {
      return response.data;
    });
}

export function getUserDetails(id: string) {
  return apiClient.get<IUserPayload[]>(`/users/${id}`).then((response) => {
    return response.data;
  });
}

export function UpdateProfileById({
  userId,
  payload,
}: {
  userId: string;
  payload: Partial<IUserPayload>;
}) {
  const cleanPayload = removeUndefinedAndNull(payload);

  return apiClient
    .put<IUserPayload>(`/users/update?userId=${userId}`, cleanPayload)
    .then((response) => {
      return response.data;
    });
}
