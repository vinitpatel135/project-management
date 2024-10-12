import axios from "axios";

export default async function usePost(data) {
  const response = await axios.post(
    "https://project-management-gcai.onrender.com/api/auth/register",
    data
  );
  return response;
}
