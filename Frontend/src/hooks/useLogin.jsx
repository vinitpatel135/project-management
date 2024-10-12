import axios from "axios";

export default async function useLogin(data) {
  const response = await axios.post(
    "https://project-management-gcai.onrender.com/api/auth/login",
    data
  );
  return response;
}
