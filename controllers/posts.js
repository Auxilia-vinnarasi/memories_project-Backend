import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  //res.send("This Works!");
  try {
    const postMessages = await PostMessage.find();
    //console.log(postMessages);
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  //for the post request we have to give req.body
  const post = req.body;
  // res.send("Post Creation");
  const newPost = new PostMessage(post);
  try {
      await newPost.save();//after saving the newpost sending res.status
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};


export const updatePost=async(req,res)=>{
  const {id:_id}=req.params    // we are extracting the id from req.params

  const post=req.body;// where are  we receiving the data for updates.. so we are receving it from req.body

  //we needs to check if this _id is mongoose object ID or not
if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that ID");

//if the id is valid we have to update our post
const updatedPost= await PostMessage.findByIdAndUpdate(_id,{...post,_id},{new:true});

res.json(updatedPost)

}

export const deletePost=async(req,res)=>{

  const { id } =req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that ID");

  await PostMessage.findByIdAndRemove(id);

  console.log("delete");

  res.json({message:"Post deleted Successfully"})
  
}

export const likePost=async(req,res)=>{

  const {id}=req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that ID");//check whether the post is valid
//we have to find the post we are looking for

const post=await PostMessage.findById(id);

const updatedPost=await PostMessage.findByIdAndUpdate(id,{likeCount:post.likeCount+1},{new:true});

res.json(updatedPost);
}