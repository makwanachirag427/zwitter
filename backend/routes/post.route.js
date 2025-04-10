import express from "express";
const router = express.Router();
import { commentOnPost, createPost, deletePost, getAllPosts, getFollowingPosts, getLikedPosts, getUserPosts, likeUnlikePost } from "../controllers/post.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

router.get("/all",protectRoute,getAllPosts);
router.get("/user/:username",protectRoute,getUserPosts);
router.get("/likes/:id",protectRoute,getLikedPosts);
router.get("/following",protectRoute,getFollowingPosts);
router.post("/create",protectRoute,createPost);
router.post("/like/:id",protectRoute,likeUnlikePost);
router.post("/comment/:id",protectRoute,commentOnPost);
router.delete("/:id",protectRoute,deletePost);




export default router;