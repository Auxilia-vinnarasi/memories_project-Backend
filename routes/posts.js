import express from "express";

import { getPosts,createPost,updatePost,deletePost,likePost } from "../controllers/posts.js";

const router = express.Router();

router.get("/",getPosts);
router.post("/",createPost);
router.patch("/:id",updatePost);//patch is used for update thing ,and existing things document
router.delete("/:id",deletePost);// which post are we gonna delete thats where we use id
router.patch("/:id/likePost",likePost)//patch request is used for updating..liking something is actually updating

export default router; 