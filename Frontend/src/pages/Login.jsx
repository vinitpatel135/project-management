import { useState } from "react";
import InputGroup from "../components/InputGroup";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";

export default function Login() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await useLogin(login);
      toast.success(response.data.message);
      localStorage.setItem("token", response.data.token);
      navigate("/home");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLogin({
        email: "",
        password: "",
      });
      setLoading(false);
    }
  };

  return (
    <section className="section-sign-in bg-gradient-to-br from-purple-400 to-pink-500 min-h-screen flex items-center justify-center">
    <div className="sign-in bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
      <h2 className="text-center text-3xl font-bold text-purple-700 mb-6">
        Welcome Back!
      </h2>
      <form onSubmit={handleSubmit}>
        <InputGroup
          label={"Email Address"}
          name={"email"}
          type={"email"}
          placeholder={"you@example.com"}
          value={login.email}
          setValue={setLogin}
          className="mb-4"
        />
        <InputGroup
          label={"Password"}
          name={"password"}
          type={"password"}
          placeholder={"********"}
          value={login.password}
          setValue={setLogin}
          className="mb-6"
        />
        <button
          className="text-white w-full bg-purple-700 p-3 rounded-lg font-semibold hover:bg-purple-800 transition-transform transform hover:scale-105 ease-in-out duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <div className="flex justify-center mt-6">
        <h3 className="text-md text-gray-500">
          New here?{" "}
          <Link to={"/signup"} className="text-green-500 font-semibold hover:text-green-600 transition duration-300 ease-in-out">
            Create an account
          </Link>
        </h3>
      </div>
    </div>
  </section>
  
  );
}
