import React, { useEffect, useState } from "react";
import { Send } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import socialServices from "../services/socialServices";
import { useForm } from "react-hook-form";
const CommentsModal = ({ post, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();
  const [comments, setComments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      await socialServices.addComment({
        post_id: post._id,
        text: data.text
      });
      await getAllComments();
      reset();
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getAllComments = async () => {
    try {
      const commentsForPost = await socialServices.getAllComments({
        postId: post._id
      });
      setComments(commentsForPost);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    getAllComments();
  }, [post._id]);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
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

        {/* Comments List */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {comments?.map((comment) => (
            <div key={comment._id} className="flex items-start space-x-2">
              <Avatar className="h-6 w-6">
                {comment.userProfile?.url ? (
                  <img src={comment.userProfile.url} alt="User avatar" />
                ) : (
                  <span>{comment.user?.fullName?.[0] || "?"}</span>
                )}
              </Avatar>
              <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-2xl px-3 py-2">
                <p className="text-xs font-medium">{comment.user?.fullName}</p>
                <p className="text-sm">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Add Comment Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <span>Y</span>
          </Avatar>
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Add a comment..."
              {...register("text", { 
                required: "Comment text is required",
                minLength: {
                  value: 1,
                  message: "Comment cannot be empty"
                }
              })}
              className={`w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm focus:outline-none ${
                errors.text ? "border-red-500" : ""
              }`}
            />
            {errors.text && (
              <span className="text-red-500 text-xs mt-1">
                {errors.text.message}
              </span>
            )}
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-1 top-1/2 -translate-y-1/2"
              type="submit"
              disabled={isSubmitting}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentsModal;