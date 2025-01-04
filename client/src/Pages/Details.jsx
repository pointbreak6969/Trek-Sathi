import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import socialServices from "../services/socialServices";
import {
  ArrowLeft,
  Share2,
  Bookmark,
  MapPin,
  Clock,
  Mountain,
  Ruler,
  Footprints,
} from "lucide-react";

const getDestinationDetails = (id) => {
  const trekDetails = {
    mardi: {
      name: "Mardi Base Camp",
      location: "Mardi Himal Trek",
      image: "/assets/mardi.jpg",  // Change to actual image path
      distance: "14.7 km",
      duration: "5 Days",
      elevation: "4,500 m",
      description: "Experience the hidden gem of the Annapurna region with breathtaking views of the Machapuchare (Fishtail) mountain.",
    },
    abc: {
      name: "Annapurna Base Camp",
      location: "Annapurna Sanctuary Trek",
      image: "/assets/abc.jpg",  // Change to actual image path
      distance: "37 km",
      duration: "7 Days",
      elevation: "4,130 m",
      description: "Journey through diverse landscapes to reach the amphitheater of mountains in the Annapurna Sanctuary.",
    },
    everest: {
      name: "Everest Base Camp",
      location: "Everest Region Trek",
      image: "/assets/everest.jpg",  // Change to actual image path
      distance: "65 km",
      duration: "12 Days",
      elevation: "5,364 m",
      description: "Trek to the base of the world's highest peak through Sherpa villages and stunning mountain vistas.",
    },
    langtang: {
      name: "Langtang Valley",
      location: "Langtang Trek",
      image: "/assets/langtang.jpg",  // Change to actual image path
      distance: "19 km",
      duration: "7 Days",
      elevation: "3,870 m",
      description: "Discover the beautiful Langtang Valley, rich in Tibetan culture and diverse flora and fauna.",
    },
    manaslu: {
      name: "Manaslu Circuit",
      location: "Manaslu Trek",
      image: "/assets/manaslu.jpg",  // Change to actual image path
      distance: "177 km",
      duration: "14 Days",
      elevation: "5,106 m",
      description: "Circle the eighth highest mountain in the world through remote villages and dramatic landscapes.",
    },
  };

  return trekDetails[id] || {
    name: "Unknown Destination",
    location: `${id || "Unknown"} Trek`,
    image: "/assets/default.jpg",
    distance: "N/A",
    duration: "N/A",
    elevation: "N/A",
    description: "Information not available for this destination.",
  };
};

export default function Details() {
  const { name } = useParams();
  const details = getDestinationDetails(name);
  const [isScrolled, setIsScrolled] = useState(false);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ text: "", profilePicture: null ,location: "" });
  const [newComment, setNewComment] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight * 1.1;
      const detailsSection = document.getElementById("trek-details");
      const detailsBottom = detailsSection?.getBoundingClientRect().bottom;

      setIsScrolled(scrollPosition > viewportHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetchPosts();
    console.log(newComment);
  }, []);

  const fetchPosts = async () => {
    try {
      const postsData = await socialServices.getAllPosts();
      setPosts(postsData);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleAddPost = async () => {
    try {
      if (!newPost.text.trim() || !newPost.profilePicture) {
        alert("Please provide both text and an image");
        return;
      }

      await socialServices.addPost({
        profilePicture: [newPost.profilePicture],
        text: newPost.text,
        location: details.name,
      });
      
      setNewPost({ text: "", profilePicture: null });
      fetchPosts();
    } catch (error) {
      console.error("Error adding post:", error);
      alert(error.message);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await socialServices.deletePost(postId);
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
      alert(error.message);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Sticky Header */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <div className="bg-white/80 backdrop-blur-lg shadow-lg">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between p-4 py-3">
              {/* Left Section */}
              <Link
                to="/"
                className="p-2 hover:bg-white/50 rounded-full transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>

              {/* Right Section */}
              <div className="flex items-center gap-4 sm:gap-8">
                <div className="flex flex-col-reverse sm:flex-col items-center">
                  <div className="flex items-center gap-1.5 text-blue-600">
                    <Ruler className="h-5 w-5 m-1 sm:h-6 sm:w-6" />
                  </div>
                  <span className="font-medium text-xs sm:text-sm">
                    {details.distance}
                  </span>
                  <span className="hidden sm:block text-xs text-gray-500">
                    Distance
                  </span>
                </div>

                <div className="flex flex-col-reverse sm:flex-col items-center">
                  <div className="flex items-center gap-1.5 text-green-600">
                    <Clock className="h-5 w-5 m-1 sm:h-6 sm:w-6" />
                  </div>
                  <span className="font-medium text-xs sm:text-sm">
                    {details.duration}
                  </span>
                  <span className="hidden sm:block text-xs text-gray-500">
                    Duration
                  </span>
                </div>
                <div className="border-l border-gray-300 h-12 sm:h-auto mx-0"></div>

                <div className="flex flex-col-reverse sm:flex-col items-center">
                  <div className="flex items-center gap-1.5 text-red-600">
                    <Mountain className="h-5 w-5 m-1 sm:h-6 sm:w-6" />
                  </div>
                  <span className="font-medium text-xs sm:text-sm">
                    {details.elevation}
                  </span>
                  <span className="hidden sm:block text-xs text-gray-500">
                    Elevation
                  </span>
                </div>
              </div>

              <button
                onClick={() => navigate(`/groupformation/${name}`)}
                className="flex ml-1 items-center gap-1 px-3 py-3.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors sm:font-medium text-sm"
              >
                <Footprints className="h-5 w-5" />
                Take This Trek
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="relative h-[70vh] w-full">
        <img
          src={details.image}
          alt={details.name}
          className="object-cover w-full h-full"
        />
        <div className="absolute top-4 left-0 right-0 flex justify-between items-center px-4">
          <Link
            to="/"
            className="p-3 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-white" />
          </Link>
          <div className="flex gap-3">
            <button className="p-3 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-colors">
              <Share2 className="h-6 w-6 text-white" />
            </button>
            <button className="p-3 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-colors">
              <Bookmark className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Trek Details */}
      <div className="bg-white rounded-t-[2.5rem] -mt-10 relative max-w-4xl mx-auto">
        <div id="trek-details" className="px-6 pt-6">
          <div className="space-y-6">
            {/* Title and Location */}
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold">{details.name}</h1>
                <div className="flex items-center gap-2 text-gray-600 mt-2">
                  <MapPin className="h-5 w-5" />
                  <span>{details.location}</span>
                </div>
              </div>
              <button
                onClick={() => navigate(`/groupformation/${name}`)}
                className="flex items-center gap-1 px-6 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium"
              >
                <Footprints className="h-4 w-4 sm:h-5 sm:w-5" />
                Take This Trek
              </button>
            </div>

            {/* Trek Stats */}
            <div className="flex justify-between items-center py-6 border-y border-gray-100">
              <div className="text-center px-4">
                <Ruler className="h-6 w-6 mx-auto text-blue-600 mb-2" />
                <p className="text-sm text-gray-600 mb-1">Distance</p>
                <p className="font-semibold text-lg">{details.distance}</p>
              </div>
              <div className="text-center px-4 border-x border-gray-100">
                <Clock className="h-6 w-6 mx-auto text-green-600 mb-2" />
                <p className="text-sm text-gray-600 mb-1">Duration</p>
                <p className="font-semibold text-lg">{details.duration}</p>
              </div>
              <div className="text-center px-4">
                <Mountain className="h-6 w-6 mx-auto text-red-600 mb-2" />
                <p className="text-sm text-gray-600 mb-1">Elevation</p>
                <p className="font-semibold text-lg">{details.elevation}</p>
              </div>
            </div>

            {/* Overview Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Overview</h2>
              <p className="text-gray-600 leading-relaxed">
                Experience the majestic beauty of {details.name}, one of Nepal's most stunning treks. This trek offers breathtaking mountain views, diverse landscapes, and authentic cultural experiences.
              </p>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="mt-8 px-6">
          <h3 className="text-xl font-semibold">Recent Updates</h3>

          {/* Post Input */}
          <div className="my-6">
            <textarea
              className="w-full p-3 border rounded-md"
              placeholder="What's on your mind?"
              value={newPost.text}
              onChange={(e) => setNewPost({ ...newPost, text: e.target.value })}
            />
            <input
              type="text"
              className="mt-3"
              onChange={(e) => setNewPost({ ...newPost, location: e.target.value })}
            />
            <input
              type="file"
              className="mt-3"
              onChange={(e) => setNewPost({ ...newPost, profilePicture: e.target.files[0] })}
            />
            <button
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-full"
              onClick={handleAddPost}
            >
              Post
            </button>
          </div>

          {/* Display Posts */}
          {posts.length === 0 ? (
            <div>No posts available. Be the first to share!</div>
          ) : (
            <div className="space-y-6 pb-20">
              {posts.map((post) => (
                <div key={post._id} className="bg-white p-4 rounded-lg shadow-md">
                  <div className="flex items-center">
                    <img
                      src={post.userProfile.profilePicture.url}
                      alt="profile"
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="ml-4">
                      <span className="font-medium">{post.user.fullName}</span>
                      <span className="text-xs text-gray-500 ml-2">
                        {new Date(post.created_at).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-700">{post.text}</p>
                  <div>
                    <img
                      src={post.image?.url}
                      alt="post"
                      className="mt-4 w-full h-48 object-cover rounded-md"
                    />
                  </div>
                  {post.comments?.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {post.comments.map((comment) => (
                        <div key={comment._id} className="flex items-center gap-2">
                          <span className="font-semibold">{comment.user}</span>
                          <span className="text-sm text-gray-500">{comment.text}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <textarea
                    placeholder="Add a comment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="mt-2 w-full p-2 border rounded-md"
                  />
                  <button
                    className="mt-2 text-blue-600"
                    onClick={() => handleAddComment(post._id, newComment)}
                  >
                    Add Comment
                  </button>
                  <button
                    className="mt-3 text-red-600"
                    onClick={() => handleDeletePost(post._id)}
                  >
                    Delete Post
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
