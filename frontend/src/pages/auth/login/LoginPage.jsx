import { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";

const LoginPage = () => {
  const [form, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setFormData({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      `Username is ${form.username} and password is ${form.password}`
    );
    setFormData({
      username: "",
      password: "",
    });
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
                value={form.username}
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
                value={form.password}
                onChange={handleOnChange}
              />
            </label>

            <button className="btn btn-neutral mt-4  rounded-lg border-gray-500">
              Login
            </button>
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
