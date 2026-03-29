import api from "./api";

// Login admin — returns { success, token }
export const loginAdmin = async (credentials) => {
  const response = await api.post("/admin/login", credentials);
  return response.data;
};

// Get all parent requests (protected)
export const getParentRequests = async () => {
  const response = await api.get("/admin/parent-requests");
  return response.data;
};

// Get all tutors (protected)
export const getTutors = async () => {
  const response = await api.get("/admin/tutors");
  return response.data;
};

// Update status of a parent request (protected)
export const updateRequestStatus = async (id, status) => {
  const response = await api.patch(`/admin/update-status/${id}`, { status });
  return response.data;
};

// Assign a tutor to a request (protected)
export const assignTutor = async (requestId, tutorId) => {
  const response = await api.post("/admin/assign-tutor", { requestId, tutorId });
  return response.data;
};

// Change admin password (protected) ← NEW
export const changePassword = async (currentPassword, newPassword) => {
  const response = await api.patch("/admin/change-password", {
    currentPassword,
    newPassword,
  });
  return response.data;
};