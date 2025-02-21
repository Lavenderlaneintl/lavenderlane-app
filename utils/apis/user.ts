import apiClient from "../configs/api";
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
