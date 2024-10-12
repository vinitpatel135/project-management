import axios from "axios";

export default async function usePost(data) {
  const response = await axios.post(
    "https://project-management-4y6b.onrender.com/api/auth/register",
    data
  );
  return response;
}
