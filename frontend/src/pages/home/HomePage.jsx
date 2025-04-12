import { useState } from "react";
import CreatePost from "./CreatePost";
import Posts from "../../components/common/Posts";

const HomePage = () => {
  const [feedType, setFeedType] = useState("forYou");
  return (
    <div className=" flex-[4_4_0] mr-auto min-h-screen border-x-1 border-gray-700 ">
      {/* header  */}
      <div className="flex  w-full border-b border-gray-700">
        <div
          className="flex flex-1 justify-center text-center 
        p-3 hover:bg-gray-900 cursor-pointer relative"
          onClick={() => setFeedType("forYou")}
        >
          For you
          {feedType === "forYou" && (
            <div className="absolute bottom-0 w-10 h-1  rounded bg-primary"></div>
          )}
        </div>
        <div
          className="flex flex-1 justify-center text-center p-3 hover:bg-gray-900 cursor-pointer relative"
          onClick={() => setFeedType("following")}
        >
          Following
          {feedType === "following" && (
            <div className="absolute bottom-0 w-10 h-1 rounded-full bg-primary"></div>
          )}
        </div>
      </div>
      <CreatePost />
      <Posts feedType={feedType}/>
    </div>
  );
};
export default HomePage;
