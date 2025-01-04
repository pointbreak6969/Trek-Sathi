import Post from '../models/post.js';
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

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
        {
            $lookup: {
                from: 'comments',
                localField: '_id',
                foreignField: 'post_id',
                as: 'comments'
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'userDetails'
            }
        },
        {
            $addFields: {
                commentCount: { $size: '$comments' },
                userFullName: { $arrayElemAt: ['$userDetails.fullName', 0] }
            }
        },
        {
            $sort: { created_at: -1 }
        },
        {
            $project: {
                comments: 0,
                userDetails: 0
            }
        }
    ]);

    res.status(200).json(new ApiResponse(200, posts, "Posts fetched successfully"));
});



export { AddPost, getAllpost, DeletePost };