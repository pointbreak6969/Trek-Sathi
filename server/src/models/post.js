import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  location:{
    type: String,
  },
  image: {
    publicId: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  text: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
