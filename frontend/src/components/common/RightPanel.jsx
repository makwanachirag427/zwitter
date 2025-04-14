import RightPanelSkeleton from "../skeletons/RightPanelSkeleton";
import { USERS_FOR_RIGHT_PANEL } from "../../utils/db/dummy";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useFollow from "../../hooks/useFollow";
import LoadingSpinner from "./LoadingSpinner";
import { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";

const RightPanel = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const inputRef = useRef(null);

  const { data: suggestedUsers, isLoading } = useQuery({
    queryKey: ["suggestedUsers"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/users/suggested");
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });

  const { follow, isFollowing } = useFollow();

  const filteredUsers = suggestedUsers?.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (suggestedUsers?.length === 0) return <div className="md:w-64 w-0"></div>;

  return (
    <div className="hidden lg:block my-4 mx-5 w-80 min-w-[16rem]">
      <div className="sticky top-4">
        <div className="mb-4 relative" ref={inputRef}>
          <label className="input rounded-full w-full border-2 border-slate-100 text-slate-100">
            <CiSearch className="h-4 w-4 mt-0.5" />
            <input
              type="search"
              placeholder="Search"
              className=" placeholder:font-semibold"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </label>

          {searchTerm && !isLoading && (
            <div className="left-0 w-full max-h-50 overflow-y-auto bg-[#16181C] rounded-md p-4 mt-4 z-10 ">
              {filteredUsers?.length === 0 && (
                <p className="text-gray-200 text-sm">No matching users.</p>
              )}
              {filteredUsers?.map((user) => (
                <Link
                  to={`/profile/${user.username}`}
                  className="flex mb-2 last:mb-0"
                  key={user._id}
                  onClick={() => setSearchTerm("")}
                >
                  <div className="flex  gap-2 items-center">
                    <div className="avatar">
                      <div className="w-8 rounded-full">
                        <img
                          src={user.profileImg || "/avatar-placeholder.png"}
                          className="w-6 h-6"
                          alt="user"
                        />
                      </div>
                    </div>

                    <div className="w-35 flex flex-col ">
                      <span className="font-semibold  text-white">
                        {user.fullName.length > 14
                          ? `${user.fullName.slice(0, 13)}...`
                          : user.fullName}
                      </span>
                      <span className="text-bold text-sm text-gray-500">
                        @{user.username}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div
          className="flex flex-col items-center bg-[#16181C] rounded-md p-4"
        >
          <p className="font-bold mb-2">Who to follow</p>
          <div className="flex flex-col gap-4">
            {/* Item */}
            {isLoading && (
              <>
                <RightPanelSkeleton />
                <RightPanelSkeleton />
                <RightPanelSkeleton />
                <RightPanelSkeleton />
              </>
            )}

            {!isLoading &&
              suggestedUsers?.slice(0, 4).map((user) => (
                <Link
                  to={`/profile/${user.username}`}
                  className="flex justify-evenly items-center gap-4"
                  key={user._id}
                >
                  <div className="flex  gap-2 items-center">
                    <div className="avatar">
                      <div className="w-8 rounded-full">
                        <img
                          src={user.profileImg || "/avatar-placeholder.png"}
                          className="w-6 h-6"
                          alt="user"
                        />
                      </div>
                    </div>

                    <div className="w-35 flex flex-col ">
                      <span className="font-semibold  text-white">
                        {user.fullName.length > 14
                          ? `${user.fullName.slice(0, 13)}...`
                          : user.fullName}
                      </span>
                      <span className="text-bold text-sm text-gray-500">
                        @{user.username}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      follow(user._id);
                    }}
                    className="btn btn-sm bg-white text-black rounded-full"
                  >
                    {isFollowing ? <LoadingSpinner size="sm" /> : "Follow"}
                  </button>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default RightPanel;
