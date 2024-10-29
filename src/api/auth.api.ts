import { SignupProps } from "../pages/Signup";
import { httpClient, requestHandler } from "./http";

export const signup = async (userData: SignupProps) => {
  return await requestHandler("post", "/users/join", userData);
  // const response = await httpClient.post("/users/join", userData);
  // return response.data;
};

export const resetRequest = async (data: SignupProps) => {
  return await requestHandler("post", "/users/reset", data);
  // const response = await httpClient.post("/users/reset", data);
  // return response.data;
};

export const resetPassword = async (data: SignupProps) => {
  return await requestHandler("put", "/users/reset", data);
  // const response = await httpClient.put("/users/reset", data);
  // return response.data;
};

interface LoginResponse {
  token: string;
}

export const login = async (data: SignupProps) => {
  // return await requestHandler<LoginResponse>("post", "/users/login", data); // request <R = undefined, T = undefined> 를 전부 any 로 해야함
  const response = await httpClient.post<LoginResponse>("/users/login", data);
  return response.data;
};
