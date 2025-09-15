import { FaReddit } from "react-icons/fa";
import { POSTS } from "../../utils/db/dummy";
import PostSkeleton from "../skeletons/PostSkeletons";
import Post from "./Post";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { API_URL } from "../../utils/constant";

const Posts = ({ feedType,username,userId }) => {
  const getPostEndPoint = () => {
    switch (feedType) {
      case "forYou":
        return `${API_URL}/api/posts/all`;
      case "following":
        return `${API_URL}/api/posts/following`;
      case "posts":
        return `${API_URL}/api/posts/user/${username}`;
      case "likes":
        return `${API_URL}/api/posts/likes/${userId}` ;
      default:
        return `${API_URL}/api/posts/all`;
    }
  };
  const POSTENDPOINT = getPostEndPoint();
  
  const { data: posts, isLoading,refetch,isRefetching } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      try {
        const res = await fetch(POSTENDPOINT,{credentials:"include"});
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

  useEffect(() => {
    refetch();
  },[feedType,refetch,username])

  return (
    <>
      {(isLoading || isRefetching ) && (
        <div>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </div>
      )}
      {!isLoading && !isRefetching && posts?.length === 0 && (
        <p className="text-center my-4">No posts in this tab. Switch 👻</p>
      )}
      {!isLoading && !isRefetching && posts && (
        <div>
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      )}
    </>
  );
};
export default Posts;
