import apiClient from "../configs/api";
import {
  IRegisterPayload,
  IVerifyEmailPayload,
} from "../interfaces/auth.interfaces";

export function RegisterUser(payload: IRegisterPayload) {
  return apiClient.post<any>("/auth/signup", payload).then((response) => {
    return response.data;
  });
}

export function UserLogin(payload: IRegisterPayload) {
  return apiClient.post<any>("/auth/login", payload).then((response) => {
    return response.data;
  });
}

export function VerifyEmail(payload: IVerifyEmailPayload) {
  return apiClient.post<any>("/auth/verify", payload).then((response) => {
    return response.data;
  });
}
