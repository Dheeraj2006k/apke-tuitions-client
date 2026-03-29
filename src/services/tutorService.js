import api from "./api";

export const submitTutorRegistration = async (formData) => {
  const response = await api.post("/tutor-register", formData);
  return response.data;
};