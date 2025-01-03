import Comment from '../models/Comment.js';

const AddComment = async (req, res) => {
    const { user_id, post_id, text } = req.body;
    try {
        const newComment = new Comment({ user_id, post_id, text });
        const savedComment = await newComment.save();
        return res.status(200).json({ "message": "Comment Added", "Comment": savedComment });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "message": "Error adding comment" });
    }
}

const getAllComment = async (req, res) => {
    const { id } = req.params;
    try {
        const comments = await Comment.find({ post_id: id }).sort({ created_at: -1 });
        return res.status(200).json({ "message": "comments loaded", "comments": comments });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "message": "Error loading comments" });
    }
}

const deleteComment = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Comment.findByIdAndDelete(id);
        if (result) {
            return res.status(200).json({ "message": "Comment deleted successfully" });
        } else {
            return res.status(404).json({ "message": "Comment not found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "message": "Error deleting comment" });
    }
}

const upvoteComment = async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await Comment.findById(id);
        if (comment) {
            comment.upvotes += 1;
            await comment.save();
            return res.status(200).json({ "message": "Comment upvoted successfully", "Comment": comment });
        } else {
            return res.status(404).json({ "message": "Comment not found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "message": "Error upvoting comment" });
    }
}

const downvoteComment = async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await Comment.findById(id);
        if (comment) {
            comment.downvotes += 1;
            await comment.save();
            return res.status(200).json({ "message": "Comment downvoted successfully", "Comment": comment });
        } else {
            return res.status(404).json({ "message": "Comment not found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "message": "Error downvoting comment" });
    }
}

export { AddComment, getAllComment, deleteComment, upvoteComment, downvoteComment };