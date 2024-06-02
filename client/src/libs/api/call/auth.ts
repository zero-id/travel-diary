import { API } from "..";

interface ILoginData {
  email: string;
  password: string;
}

export interface IRegisterData {
  fullname: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}

export const signInAPI = async (data: ILoginData) => {
  return await API.post("/auth/sign-in", data);
};

export const signUpAPI = async (data: IRegisterData) => {
  return await API.post("/auth/sign-up", data);
};


