import React, { useEffect } from "react";

import { Send } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import socialServices from "../services/socialServices";

const CommentsModal = ({ post, onClose }) => {
  const [newComment, setNewComment] = React.useState("");
  const [comment, setComment] = React.useState([]);
  const handleAddComment = async () => {
    if (newComment.trim().length === 0) return;
    onClose(false)
    // Add Comment
    console.log("post", post);
    console.log("post.post_id", post._id);
    console.log("post.text", post.text);
    const text = post.text;
    const post_id = post._id;
    const postsData = await socialServices.addComment({post_id, text});
    console.log("comment", postsData);
    
  };
useEffect(() => {
    getAllComments();
  }, []);
  const getAllComments = async () => {
    const commentForPost = await socialServices.getAllComments({postId:post._id});
    setComment(commentForPost);
    console.log("comment for post", commentForPost);
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-md space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium">Comments</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 dark:hover:text-white"
          >
            ✖
          </button>
        </div>

        {/* Existing Comments */}
        <div className="space-y-4">
          {comment?.map((comment) => (
            <div key={comment._id} className="flex items-start space-x-2">
              <Avatar className="h-6 w-6">
                <span>{comment.user[0]}</span>
              </Avatar>
              <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-2xl px-3 py-2">
                <p className="text-xs font-medium">{comment.user?.fullName}</p>
                <p className="text-sm">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Add Comment */}
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <span>Y</span>
          </Avatar>
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm focus:outline-none"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-1 top-1/2 -translate-y-1/2"
              onClick={handleAddComment}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsModal;
