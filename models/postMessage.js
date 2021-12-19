import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String, //each post going to have these things like title
  message: String,
  creator: String,
  tags: [String], //array of string
  selectedFile: String, // we are converting this image to string using file-base64
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

//now we have schema to have to turn that into model
const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;