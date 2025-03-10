import axios from "axios";

const BASE_URL = "https://aircall-api.onrender.com"; // Base API URL

export const fetchCalls = async () => {
  const response = await axios.get(`${BASE_URL}/activities`);
  return response.data;
};

export const fetchCallDetails = async (callId) => {
  const response = await axios.get(`${BASE_URL}/activities/${callId}`);
  return response.data;
};

export const updateCallArchiveStatus = async (callId, isArchived) => {
  await axios.patch(`${BASE_URL}/activities/${callId}`, { is_archived: isArchived });
};

export const resetCalls = async () => {
  await axios.patch(`${BASE_URL}/reset`);
};
