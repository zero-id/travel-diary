import { API } from "..";

export const getBookmarkAPI = async () => {
  return await API.get("/bookmark", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
export const createBookmarkAPI = async (body: {
  journeyId: number | undefined;
}) => {
  return await API.post("/bookmark", body, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
