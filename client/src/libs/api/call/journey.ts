import { API } from "..";

export const createJourney = async (body: FormData) => {
  return await API.post("/journey", body, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const getAllJourneyApi = async () => {
  return await API.get("/journey");
};

export const getJourneyById = async (id: number) => {
  return await API.get(`/journey/${id}`);
};

export const searchJourney = async (title: string) => {
  return await API.get(`/journey/search?title=${title}`);
};
