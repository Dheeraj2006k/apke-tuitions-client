import api from "./api";

export const submitParentRequest = async (formData) => {
  const response = await api.post("/parent-request", formData);
  return response.data;
};