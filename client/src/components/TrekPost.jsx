"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ArrowBigUp, ArrowBigDown, MessageSquare, MapPin, Calendar, Trash2 } from 'lucide-react';
import socialServices from "@/services/socialServices";
import { useForm } from "react-hook-form";

const TrekPost = ({ id, author, location, date, description, imageUrl, onDeletePost }) => {
  const [comments, setComments] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchedComments = await socialServices.getAllComments(id);
        setComments(fetchedComments);
      } catch (error) {
        console.error("Error fetching comments:", error.message);
      }
    };

    fetchComments();
  }, [id]);

  const handleVote = async (commentId, voteType) => {
    try {
      if (voteType === "up") {
        await socialServices.upvoteComment(commentId);
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? { ...comment, upvotes: comment.upvotes + 1 }
              : comment
          )
        );
      } else {
        await socialServices.downvoteComment(commentId);
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? { ...comment, downvotes: comment.downvotes + 1 }
              : comment
          )
        );
      }
    } catch (error) {
      console.error(`Error ${voteType}voting comment:`, error.message);
    }
  };

  const handleAddComment = async (data) => {
    try {
      const addedComment = await socialServices.addComment({
        post_id: id,
        text: data.text,
      });
      setComments([...comments, addedComment]);
      reset();
    } catch (error) {
      console.error("Error adding comment:", error.response?.data?.message || "An error occurred");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await socialServices.deleteComment(commentId);
      setComments(comments.filter((comment) => comment._id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error.message);
    }
  };

  const handleDeletePost = async () => {
    try {
      await socialServices.deletePost(id);
      onDeletePost(id);
    } catch (error) {
      console.error("Error deleting post:", error.message);
    }
  };

  return (
    <Card className="mb-6 overflow-hidden shadow-lg rounded-lg bg-white max-w-2xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white pb-4">
        <div className="flex items-center space-x-4">
          <Avatar className="border-2 border-white">
            <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={author} />
            <AvatarFallback>{author ? author[0] : "U"}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-semibold">{author}</h3>
            <div className="flex items-center space-x-2 text-sm opacity-80">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
              <span>•</span>
              <Calendar className="w-4 h-4" />
              <span>{date}</span>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleDeletePost} className="text-red-600 hover:text-red-800 p-0 ml-auto">
            <Trash2 className="w-5 h-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="mb-4 text-gray-700 text-lg">{description}</p>
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Trek image"
            className="w-full h-80 object-cover rounded-lg shadow-md mb-4"
          />
        )}
      </CardContent>
      <Separator />
      <CardFooter className="flex flex-col items-start bg-gray-50 pt-4">
        <h4 className="font-semibold mb-4 text-indigo-600 text-lg">Comments</h4>
        {comments.map((comment) => (
          <div key={comment._id} className="flex items-start space-x-3 mb-4 w-full">
            <Avatar className="w-12 h-12">
              <AvatarImage src={comment.userProfile?.profilePicture?.url || `/placeholder.svg?height=48&width=48`} alt={comment.user.fullName} />
              <AvatarFallback>{comment.user.fullName ? comment.user.fullName[0] : "U"}</AvatarFallback>
            </Avatar>
            <div className="flex-grow bg-white p-3 rounded-lg shadow">
              <p className="text-sm font-semibold text-gray-700">{comment.user.fullName}</p>
              <p className="text-sm text-gray-600 mt-1">{comment.text}</p>
              <div className="flex items-center space-x-2 mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleVote(comment._id, "up")}
                  className="text-indigo-600 hover:text-indigo-800 p-0"
                >
                  <ArrowBigUp className="w-4 h-4" />
                </Button>
                <span className="text-sm font-semibold">{comment.upvotes}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleVote(comment._id, "down")}
                  className="text-gray-600 hover:text-gray-800 p-0"
                >
                  <ArrowBigDown className="w-4 h-4" />
                </Button>
                <span className="text-sm font-semibold">{comment.downvotes}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteComment(comment._id)}
                  className="text-red-600 hover:text-red-800 p-0 ml-auto"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
        <form onSubmit={handleSubmit(handleAddComment)} className="flex items-center space-x-2 w-full mt-4">
          <Input
            placeholder="Add a comment..."
            {...register("text")}
            className="flex-grow p-2 border rounded-md border-indigo-300 focus:ring-2 focus:ring-indigo-500"
          />
          <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <MessageSquare className="w-4 h-4 mr-2" />
            Comment
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default TrekPost;