import { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { MdDriveFileRenameOutline, MdOutlinePassword } from "react-icons/md";
import { MdEmail } from "react-icons/md";

const SignupPage = () => {
  const [form, setFormData] = useState({
    email: "",
    username: "",
    fullName: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setFormData({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.table(form);
    // setFormData({

    // });
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
                value={form.email}
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
                  value={form.username}
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
                  value={form.fullName}
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
                value={form.password}
                onChange={handleOnChange}
              />
            </label>

            <button className="btn btn-neutral mt-4  rounded-lg border-gray-500">
              Login
            </button>
          </fieldset>
        </form>
        <div className="fieldset w-sm px-8 py-0">
          <p className="text-base">Already have an account?</p>
          <Link
            to="/login"
            className="btn btn-outline  mt-2 rounded-lg border-gray-500"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SignupPage;
