import Comment from '../models/Comment.js';
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import mongoose from 'mongoose';

const AddComment = asyncHandler(async (req, res) => {
    const {  post_id, text } = req.body;
    console.log(req.body);
    if (!( post_id && text)) {
        throw new ApiError(400, "All fields are required");
    }
    const newComment = new Comment({ user_id:req.user._id, post_id, text });
    const savedComment = await newComment.save();
    res.status(200).json(new ApiResponse(200, savedComment, "Comment added successfully"));
});

const getAllComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const comments = await Comment.aggregate([
      { $match: { post_id: new mongoose.Types.ObjectId(id) } },
      { $sort: { created_at: -1 } },
      {
        $lookup: {
          from: 'users',
          localField: 'user_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' },
      {
        $lookup: {
          from: 'userprofiles',  
          localField: 'user._id',
          foreignField: 'user', 
          as: 'userProfile'  
        }
      },
      { $unwind: { path: '$userProfile', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 1,
          user_id: 1,
          post_id: 1,
          text: 1,
          upvotes: 1,
          downvotes: 1,
          created_at: 1,
          'user._id': 1,
          'user.name': 1,
          'userProfile.profilePicture.url': 1
        }
      }
    ]);
    
    res.status(200).json(new ApiResponse(200, comments, "Comments loaded successfully"));
});

const deleteComment = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await Comment.findByIdAndDelete(id);
    if (!result) {
        throw new ApiError(404, "Comment not found");
    }
    res.status(200).json(new ApiResponse(200, null, "Comment deleted successfully"));
});

const upvoteComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);
    if (!comment) {
        throw new ApiError(404, "Comment not found");
    }
    comment.upvotes += 1;
    await comment.save();
    res.status(200).json(new ApiResponse(200, comment, "Comment upvoted successfully"));
});

const downvoteComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);
    if (!comment) {
        throw new ApiError(404, "Comment not found");
    }
    comment.downvotes += 1;
    await comment.save();
    res.status(200).json(new ApiResponse(200, comment, "Comment downvoted successfully"));
});

export { AddComment, getAllComment, deleteComment, upvoteComment, downvoteComment };