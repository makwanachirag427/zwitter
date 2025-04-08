import RightPanelSkeleton from "../skeletons/RightPanelSkeletons";
import { USERS_FOR_RIGHT_PANEL } from "../../utils/db/dummy";
import { Link } from "react-router-dom";

const RightPanel = () => {
  const isLoading = false;
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
            USERS_FOR_RIGHT_PANEL?.map((user) => (
              <Link
                to={`/profile/${user?.username}`}
                className="flex justify-start items-center gap-4"
                key={user._id}
              >
                  <div className="flex  gap-2 items-center">
                  <div className="avatar">
                    <div className="w-8 rounded-full">
                      <img
                        src={user.profileImg || "/avatar-placehoder"}
                        className="w-6 h-6"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col">
                  <span className="font-semibold  text-white w-28">
                    {user.fullName}
                  </span>
                  <span className="text-bold text-sm text-gray-500">
                    @{user.username}
                  </span>
                  </div>
                  </div>
              

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    alert("User Follwed Successfully");
                  }}
                  className="btn btn-sm bg-white text-black rounded-full"
                >
                  Follow
                </button>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};
export default RightPanel;
