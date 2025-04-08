import { Link } from "react-router-dom";
import { MdHomeFilled } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
const Sidebar = () => {

  const data = {
    fullName: "John Doe",
    username: "johndoe",
    profileImg: "/avatars/boy1.png",
  };
  
  return (
    <div className="relative min-h-screen  w-18 md:w-[18%]  flex flex-col  items-center lg:items-start justify-between">
      <ul className="sticky top-0 left-0 flex flex-col items-center lg:items-start">
        <li className="lg:hidden">
          <Link
            to="/"
            className="flex justify-center items-center text-3xl  my-2 px-4"
          >
            Z
          </Link>
        </li>
        <li>
          <Link
            to="/"
            className=" hidden sm:hidden lg:flex justify-center items-center text-3xl  mb-8 px-4 mt-2"
          >
            Zwitter
          </Link>
        </li>
        <li className="flex items-center  border border-transparent rounded-3xl p-2 mb-2  lg:pr-5 w-fit  hover:bg-gray-900">
          <Link to="/" className="flex items-center">
            <MdHomeFilled className="w-8 h-8" />
            <span className="ml-4 hidden lg:block  text-lg">Home</span>
          </Link>
        </li>
        <li className="flex items-center  border border-transparent rounded-3xl p-2 mb-2 w-fit lg:pr-5 hover:bg-gray-900">
          <Link to="/notifications" className="flex items-center ">
            <IoIosNotifications className="w-8 h-8" />
            <span className="ml-4 hidden lg:block  text-lg">Notifications</span>
          </Link>
        </li>
        <div className="flex items-center  border border-transparent rounded-3xl p-2 w-fit  lg:pr-5 lg:pl-3  hover:bg-gray-900">
          <Link to={`/profile/${data?.username}`} className="flex items-center">
            <FaUser className="w-6 h-6" />
            <span className="ml-5 hidden lg:block  text-lg">Profile</span>
          </Link>
        </div>
      </ul>

      {data && (
        <Link
          to={`/profile/${data?.username}`}
          className="fixed bottom-0 rounded-full hover:bg-gray-900 p-2 flex justify-evenly items-center gap-3  mb-3"
        >
          <div className="avatar hidden lg:block">
            <div className="w-8">
              <img
                src={data?.profileImg || "/avatar-placehoder"}
                className="w-6 h-6"
              />
            </div>
          </div>
          <div className="hidden lg:block">
            <p className="font-semibold text-sm text-white leading-none">{data?.fullName}</p>
            <p className="text-bold text-sm text-gray-500">@{data?.username}</p>
          </div>
          <BiLogOut
            className="w-6 h-6"
            onClick={(e) => {
              e.preventDefault();
              console.log(`Logged out successfully`);
            }}
          />
        </Link>
      )}
    </div>
  );
};
export default Sidebar;
