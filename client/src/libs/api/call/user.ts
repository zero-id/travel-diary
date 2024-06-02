import { API } from "..";

export const getUser = async (token: string) => {
  return await API.get("/user/detail", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
