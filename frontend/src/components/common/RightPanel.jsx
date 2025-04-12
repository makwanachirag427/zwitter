import RightPanelSkeleton from "../skeletons/RightPanelSkeleton";
import { USERS_FOR_RIGHT_PANEL } from "../../utils/db/dummy";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useFollow from "../../hooks/useFollow";
import LoadingSpinner from "./LoadingSpinner";

const RightPanel = () => {

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

  if (suggestedUsers?.length === 0)  return <div className="md:w-64 w-0"></div>;


  return (
    <div className="hidden lg:block my-4 mx-2">
      <div className="bg-[#16181C] sticky top-2 rounded-md p-4">
        <p className="font-bold">Who to follow</p>
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
            suggestedUsers?.map((user) => (
              <Link
                to={`/profile/${user.username}`}
                className="flex justify-start items-center gap-4"
                key={user._id}
              >
                <div className="flex  gap-2 items-center">
                  <div className="avatar">
                    <div className="w-8 rounded-full">
                      <img
                        src={user.profileImg || "/avatar-placeholder.png"}
                        className="w-6 h-6"
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
  );
};
export default RightPanel;
