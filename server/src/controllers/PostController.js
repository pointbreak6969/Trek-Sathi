import Post from '../models/post.js';
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import mongoose from 'mongoose';

const AddPost = asyncHandler(async (req, res) => {
    const { text, location } = req.body;
    if (!text) {
        throw new ApiError(400, "Text field is required");
    }

    let imageUrl = null;
    if (req.file) {
        const uploadResponse = await uploadOnCloudinary(req.file.path);
        if (!uploadResponse) {
            throw new ApiError(500, "Failed to upload image");
        }
        imageUrl = uploadResponse;
    }

    const newPost = new Post({
        user: req.user._id,
        location,
        image: imageUrl ? {
            publicId: imageUrl.public_id,
            url: imageUrl.url,
        } : null,
        text
    });

    const savedPost = await newPost.save();
    res.status(201).json(new ApiResponse(201, { postId: savedPost._id }, "Post added successfully"));
});

const DeletePost = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new ApiError(400, "Post ID is required");
    }
    const result = await Post.findByIdAndDelete(id);
    if (!result) {
        throw new ApiError(404, "Post not found");
    }
    res.status(200).json(new ApiResponse(200, null, "Post deleted successfully"));
});

const getAllpost = asyncHandler(async (req, res) => {
    const posts = await Post.aggregate([
        { $sort: { created_at: -1 } },
        {
          $lookup: {
            from: 'users',
            localField: 'user',
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
            text: 1,
            location: 1,
            image: 1,
            created_at: 1,
            'user.fullName': 1,
            'userProfile.profilePicture.url': 1
          }
        }
      ]);
    res.status(200).json(new ApiResponse(200, posts, "Posts fetched successfully"));
});

export { AddPost, getAllpost, DeletePost };