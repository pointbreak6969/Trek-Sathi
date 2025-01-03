import Post from "../models/post";

const AddPost = async (req, res) => {
    const { user_id, image, text } = req.body;
    try {
        const newPost = new Post({ user_id, image, text });
        const savedPost = await newPost.save();
        return res.status(201).json({ message: "Post added successfully", postId: savedPost._id });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred while adding the post" });
    }
}

const DeletePost = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json("post is not present");
    }
    try {
        const result = await Post.findByIdAndDelete(id);
        if (result) {
            return res.status(200).json({ "message": "post deleted successfully" });
        } else {
            return res.status(404).json({ "message": "Post not found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "message": "Error deleting post" });
    }
}

const getAllpost = async (req, res) => {
    try {
        const posts = await Post.find().sort({ created_at: -1 });
        return res.status(200).json({ results: posts });
    } catch (error) {
        console.error('Error fetching posts:', error);
        return res.status(500).json({ message: "Error fetching posts" });
    }
}

export { AddPost, getAllpost, DeletePost };