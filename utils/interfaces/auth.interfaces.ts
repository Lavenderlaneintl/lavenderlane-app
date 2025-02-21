export interface IRegisterPayload {
  email: string;
  password: string;
}

export interface IVerifyEmailPayload {
  email: string;
  code: string;
}

export interface IAuthData {
  id: string;
  token: string;
}
