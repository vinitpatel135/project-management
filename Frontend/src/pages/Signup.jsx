import { useState } from "react";
import InputGroup from "../components/InputGroup";
import { toast } from "react-toastify";
import usePost from "../hooks/usePost";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function Signup() {
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await usePost(register);
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setRegister({
        name: "",
        email: "",
        password: "",
      });
      setLoading(false);
    }
  };

  return (
    // <section className="section-sign-up bg-purple-300">
    //   <div className="grid place-items-center h-screen">
    //     <div className="sign-up bg-white p-4 rounded-md lg:w-1/3 w-1/2">
    //       <h2 className="text-center text-2xl font-semibold text-purple-600">
    //         SIGN UP
    //       </h2>
    //       <form onSubmit={handleSubmit}>
    //         <InputGroup
    //           label={"Enter Name"}
    //           name={"name"}
    //           type={"text"}
    //           placeholder={"Enter Your Name"}
    //           value={register.name}
    //           setValue={setRegister}
    //         />
    //         <InputGroup
    //           label={"Enter Email"}
    //           name={"email"}
    //           type={"email"}
    //           placeholder={"Enter Your Email"}
    //           value={register.email}
    //           setValue={setRegister}
    //         />
    //         <InputGroup
    //           label={"Enter Password"}
    //           name={"password"}
    //           type={"password"}
    //           placeholder={"Enter Your Password"}
    //           value={register.password}
    //           setValue={setRegister}
    //         />
    //         <button
    //           className="text-white w-full bg-purple-900 p-1 rounded-sm hover:bg-green-600 transition my-2"
    //           type="submit"
    //           disabled={loading}
    //         >
    //           {loading ? "Please wait" : "Register"}
    //         </button>
    //       </form>
    //       <div className="flex justify-center">
    //         <h3 className="text-lg text-gray-600">
    //           Already Registered ? {" "} 
    //           <Link to={"/"} className="text-lg text-green-500">
    //             Login
    //           </Link>
    //         </h3>
    //       </div>
    //     </div>
    //   </div>
    // </section>
    <section className="section-sign-up bg-gradient-to-br from-purple-400 to-pink-500 min-h-screen flex items-center justify-center">
  <div className="sign-up bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
    <h2 className="text-center text-3xl font-extrabold text-purple-700 mb-6">
      Create Your Account
    </h2>
    <form onSubmit={handleSubmit}>
      <InputGroup
        label={"Your Name"}
        name={"name"}
        type={"text"}
        placeholder={"John Doe"}
        value={register.name}
        setValue={setRegister}
        className="mb-4"
      />
      <InputGroup
        label={"Your Email"}
        name={"email"}
        type={"email"}
        placeholder={"johndoe@example.com"}
        value={register.email}
        setValue={setRegister}
        className="mb-4"
      />
      <InputGroup
        label={"Password"}
        name={"password"}
        type={"password"}
        placeholder={"********"}
        value={register.password}
        setValue={setRegister}
        className="mb-6"
      />
      <button
        className="text-white w-full bg-purple-700 hover:bg-purple-800 p-3 rounded-md font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        type="submit"
        disabled={loading}
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </button>
    </form>
    <div className="flex justify-center mt-6">
      <h3 className="text-md text-gray-500">
        Already have an account?{" "}
        <Link to={"/login"} className="text-green-500 font-semibold hover:text-green-600 transition duration-300 ease-in-out">
          Log in
        </Link>
      </h3>
    </div>
  </div>
</section>

  );
}
