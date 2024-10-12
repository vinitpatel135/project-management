import axios from "axios";

export default async function useLogin(data) {
  const response = await axios.post(
    "https://project-management-4y6b.onrender.com/api/auth/login",
    data
  );
  return response;
}
