import { POSTS } from "../../utils/db/dummy"
import PostSkeleton from "../skeletons/PostSkeletons"
import Post from "./Post";




const Posts = () => {
    const isLoading = false;
  return (
    <>
     {isLoading && (
        <div>
            <PostSkeleton/>
            <PostSkeleton/>
            <PostSkeleton/>
        </div>
     )}
     {!isLoading && POSTS?.length === 0  && (
        <p className="text-center my-4">No posts in this tab. Switch 👻</p>
     )}
     {!isLoading && POSTS && (
        <div>
            {POSTS.map((post) =>(
                <Post key={post._id} post={post}/>
            ))}
        </div>
     )}
    </>
  )
   
}
export default Posts