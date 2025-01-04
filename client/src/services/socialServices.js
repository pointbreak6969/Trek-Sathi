import axios from "axios";
import { baseUrl } from '@/lib/constant';

class SocialServices {
  async addPost({ profilePicture, text, location }) {
    try {
      if (!profilePicture || !text || !location) {
        throw new Error("All fields are required");
      }

      const formData = new FormData();
      formData.append("image", profilePicture[0]);
      formData.append("text", text);
      formData.append("location", location);

      const response = await axios.post(
        `${baseUrl}/post/addpost`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      throw new Error(errorMessage);
    }
  }

  async getAllPosts() {
    try {
      const response = await axios.get(`${baseUrl}/post/getallpost`, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      throw new Error(errorMessage);
    }
  }

  async deletePost(postId) {
    try {
      const response = await axios.post(`${baseUrl}/post/deletepost/${postId}`, {}, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      throw new Error(errorMessage);
    }
  }

  async addComment({ post_id, text, user_id }) {
    try {
      console.log("post_id at addComment", post_id);
      if (!user_id || !post_id || !text) {
        throw new Error("All fields are required");
      }

      const response = await axios.post(
        `${baseUrl}/comment/addcomment`,
        { post_id, text, user_id },
        {
          withCredentials: true,
        }
      );

      return response.data.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      throw new Error(errorMessage);
    }
  }

  async getAllComments({postId}) {
    try {
      const response = await axios.get(`${baseUrl}/comment/getallcomment/${postId}`, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      throw new Error(errorMessage);
    }
  }

  async deleteComment(commentId) {
    try {
      const response = await axios.post(`${baseUrl}/comment/deletecomment/${commentId}`, {}, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      throw new Error(errorMessage);
    }
  }

  async upvoteComment(commentId) {
    try {
      const response = await axios.post(`${baseUrl}/comment/upvote/${commentId}`, {}, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      throw new Error(errorMessage);
    }
  }

  async downvoteComment(commentId) {
    try {
      const response = await axios.post(`${baseUrl}/comment/downvote/${commentId}`, {}, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      throw new Error(errorMessage);
    }
  }
}

const socialServices = new SocialServices();
export default socialServices;
