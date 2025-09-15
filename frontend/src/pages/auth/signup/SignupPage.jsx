import { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { MdDriveFileRenameOutline, MdOutlinePassword } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { API_URL } from "../../../utils/constant";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    fullName: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const {
    mutate: signUpMutation,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async ({ email, username, fullName, password }) => {
      try {
        const res = await fetch(`${API_URL}/api/auth/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, username, fullName, password }),
          credentials: "include",
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to create account");
        }
        console.log(data);
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      toast.success("Account created successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      setFormData({
        email: "",
        username: "",
        fullName: "",
        password: "",
      });
    },
  });

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    signUpMutation(formData);
  };
  return (
    <div className="min-h-screen w-full   flex flex-col sm:flex-row justify-center items-center ">
      <div className=" flex justify-center items-center">
        <img
          src="/zwitter.png"
          alt="Zwitter"
          className="w-60 sm:w-70 lg:w-90"
        />
      </div>
      <div className="sm:border-l-2 sm:border-t-0 border-gray-500 flex flex-col justify-center items-center pb-8">
        <form onSubmit={handleSubmit}>
          <fieldset className="fieldset w-sm px-8 py-4">
            <h1 className="font-extrabold text-4xl mb-2">Join today.</h1>

            <label className="input rounded-md border-gray-500">
              <MdEmail className="opacity-70" />
              <input
                type="email"
                name="email"
                placeholder="email"
                required
                className="placeholder:text-gray-400"
                value={formData.email}
                onChange={handleOnChange}
              />
            </label>

            <div className="flex gap-2 mt-2">
              <label className="input rounded-md border-gray-500">
                <FaRegUser className="opacity-70" />
                <input
                  type="text"
                  name="username"
                  placeholder="username"
                  required
                  className="placeholder:text-gray-400"
                  value={formData.username}
                  onChange={handleOnChange}
                />
              </label>
              <label className="input rounded-md border-gray-500">
                <MdDriveFileRenameOutline className="opacity-70" />
                <input
                  type="text"
                  name="fullName"
                  placeholder="fullname"
                  required
                  className="placeholder:text-gray-400"
                  value={formData.fullName}
                  onChange={handleOnChange}
                />
              </label>
            </div>

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
              {isPending ? "Loading..." : "Sign up"}
            </button>
            {isError && <div className="text-red-500">{error.message}</div>}
          </fieldset>
        </form>
        <div className="fieldset w-sm px-8 py-0">
          <p className="text-base">Already have an account?</p>
          <Link
            to="/login"
            className="btn btn-outline  mt-2 rounded-lg border-gray-500"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SignupPage;
