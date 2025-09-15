import { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { API_URL } from "../../../utils/constant";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const {
    mutate: loginMutation,
    isError,
    isPending,
    error,
  } = useMutation({
    mutationFn: async ({ username, password }) => {
      try {
        const res = await fetch(`${API_URL}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        console.log(data);
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      toast.success("Logged in successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      setFormData({
        username: "",
        password: "",
      });
    },
  });

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation(formData);
  };
  return (
    <div className="min-h-screen w-full   flex flex-col sm:flex-row justify-center items-center ">
      <div className=" flex justify-center items-center">
        <img
          src="/zwitter.png"
          alt="Zwitter"
          className="w-50 sm:w-70 lg:w-90"
        />
      </div>
      <div className=" border-t-2 sm:border-l-2 sm:border-t-0 border-gray-500 flex flex-col justify-center items-center pb-8">
        <form onSubmit={handleSubmit}>
          <fieldset className="fieldset w-xs px-8 py-4">
            <h1 className="font-extrabold text-4xl">Let's go.</h1>

            <label className="input rounded-md border-gray-500 my-2 ">
              <FaRegUser className="opacity-70" />
              <input
                type="input"
                name="username"
                placeholder="username"
                required
                className="placeholder:text-gray-400"
                value={formData.username}
                onChange={handleOnChange}
              />
            </label>

            <label className="input rounded-md border-gray-500 my-2 ">
              <MdOutlinePassword className="opacity-70" />
              <input
                type="password"
                name="password"
                placeholder="password"
                required
                className="placeholder:text-gray-400"
                value={formData.password}
                onChange={handleOnChange}
              />
            </label>

            <button className="btn btn-neutral mt-4  rounded-lg border-gray-500">
              {isPending ? "Loading" : "Log in"}
            </button>
            {isError && <div className="text-red-500">{error.message}</div>}
          </fieldset>
        </form>
        <div className="fieldset w-xs px-8 py-0">
          <p className="text-base">Don't have an account?</p>

          <Link
            to="/signup"
            className="btn btn-outline  mt-2 rounded-lg border-gray-500"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
