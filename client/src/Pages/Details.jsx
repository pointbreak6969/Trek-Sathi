import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import mardi from "../assets/mardi.jpg";
import abc from "../assets/abc.jpg";
import everest from "../assets/everest.jpg";
import langtang from "../assets/langtang.jpg";
import manaslu from "../assets/manaslu.jpg";
import { useSelector } from "react-redux";
import socialServices from "@/services/socialServices";
import { ArrowUp, ArrowDown } from "lucide-react";

import {
  ArrowLeft,
  Share2,
  Bookmark,
  MapPin,
  Clock,
  Mountain,
  Ruler,
  ChevronDown,
  Image,
  MessageCircle,
  Heart,
  Footprints,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const getDestinationDetails = (id) => {
  const trekDetails = {
    mardi: {
      name: "Mardi Base Camp",
      location: "Mardi Himal Trek",
      image: mardi,
      distance: "14.7 km",
      duration: "5 Days",
      elevation: "4,500 m",
      description:
        "Experience the hidden gem of the Annapurna region with breathtaking views of the Machapuchare (Fishtail) mountain.",
    },
    abc: {
      name: "Annapurna Base Camp",
      location: "Annapurna Sanctuary Trek",
      image: abc,
      distance: "37 km",
      duration: "7 Days",
      elevation: "4,130 m",
      description:
        "Journey through diverse landscapes to reach the amphitheater of mountains in the Annapurna Sanctuary.",
    },
    everest: {
      name: "Everest Base Camp",
      location: "Everest Region Trek",
      image: everest,
      distance: "65 km",
      duration: "12 Days",
      elevation: "5,364 m",
      description:
        "Trek to the base of the world's highest peak through Sherpa villages and stunning mountain vistas.",
    },
    langtang: {
      name: "Langtang Valley",
      location: "Langtang Trek",
      image: langtang,
      distance: "19 km",
      duration: "7 Days",
      elevation: "3,870 m",
      description:
        "Discover the beautiful Langtang Valley, rich in Tibetan culture and diverse flora and fauna.",
    },
    manaslu: {
      name: "Manaslu Circuit",
      location: "Manaslu Trek",
      image: manaslu,
      distance: "177 km",
      duration: "14 Days",
      elevation: "5,106 m",
      description:
        "Circle the eighth highest mountain in the world through remote villages and dramatic landscapes.",
    },
  };

  return (
    trekDetails[id] || {
      name: "Unknown Destination",
      location: `${id || "Unknown"} Trek`,
      image: "../assets/default.jpg",
      distance: "N/A",
      duration: "N/A",
      elevation: "N/A",
      description: "Information not available for this destination.",
    }
  );
};

export default function Details() {
  const { id } = useParams();
  const details = getDestinationDetails(id);
  const [isScrolled, setIsScrolled] = useState(false);
  const [canScrollPosts, setCanScrollPosts] = useState(false);
  ("");
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState("");
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(""); // Add a location input if neede
  // // State to manage the vote counts
  const [upvotes, setUpvotes] = useState();
  const [downvotes, setDownvotes] = useState();

  // Function to handle upvotes
  const handleUpvote = () => {
    setUpvotes((prevUpvotes) => prevUpvotes + 1);
  };

  // Function to handle downvotes
  const handleDownvote = () => {
    setDownvotes((prevDownvotes) => prevDownvotes + 1);

    // Optionally, call an API to persist the downvote
    // Example:
    // axios.post('/api/vote', { postId: post.id, type: 'downvote' });
  };

  useEffect(() => {
    getAllPosts();
  }, []);
  const getAllPosts = async () => {
    try {
      const posts = await socialServices.getAllPosts();
      console.log("All posts fetched successfully:", posts);
      setPosts(posts);
    } catch (error) {
      console.error("Error fetching posts:", error.message);
    }
  };

  const deletePost = async (postId) => {
    try {
      const response = await socialServices.deletePost(postId);
      console.log("Post deleted successfully:", response);
      return response;
    } catch (error) {
      console.error("Error deleting post:", error.message);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight * 1.1;
      const detailsSection = document.getElementById("trek-details");
      const detailsBottom = detailsSection?.getBoundingClientRect().bottom;

      setIsScrolled(scrollPosition > viewportHeight);
      setCanScrollPosts(detailsBottom < window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCommentChange = (e) => setComment(e.target.value);
  const handleImageChange = (e) => setImage(e.target.files[0]);
  const handleLocationChange = (e) => setLocation(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment || image) {
      // Call addPost with the necessary data (profilePicture, text, and location)
      await addPost(image, comment, location);
    }
  };

  const addPost = async (profilePicture, text, location) => {
    try {
      const formData = new FormData();
      formData.append("profilePicture", profilePicture);
      formData.append("text", text);
      formData.append("location", location);

      // Assuming the addPost function from socialServices sends the request
      const data = await socialServices.addPost(formData);
      console.log("Post added successfully:", data);
    } catch (error) {
      console.error("Error adding post:", error.message);
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
            <div className="flex items-center justify-between p-4  py-3">
              {/* Left Section */}
              <Link
                to="/"
                className="p-2 hover:bg-white/50 rounded-full transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>

              {/* Right Section */}
              <div className="flex items-center gap-4 sm:gap-8 ">
                <div className="hidden sm:block  flex-col-reverse sm:flex-col items-center">
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
                onClick={() => {
                  const status = useSelector((state) => state.auth.status); // Access Redux state

                  if (status) {
                    navigate(`/groupformation/${id}`);
                  } else {
                    navigate("/login");
                  }
                }}
                className="flex ml-1  items-center gap-1 px-3 py-3.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors sm:font-medium text-sm"
              >
                <Footprints className="h-5 w-5" />
                Take This Trek
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Initial View Section */}
      <div className="initial-view">
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

          {/* Gradient Overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* Trek Details Section */}
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
                  onClick={() => navigate(`/groupformation/${id}`)}
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
                  Experience the majestic beauty of {details.name}, one of
                  Nepal's most stunning treks. This trek offers breathtaking
                  mountain views, diverse landscapes, and authentic cultural
                  experiences.
                </p>
              </div>
            </div>
          </div>

          {/* Scrollable Posts Section */}
          <div
            className={`mt-8 transition-all duration-300 ${
              isScrolled ? "overflow-y-auto" : "overflow-hidden"
            }`}
            style={{
              maxHeight: isScrolled ? "calc(200vh - 80px)" : "auto",
            }}
          >
            <div className="px-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Recent Updates</h3>
                {!isScrolled && (
                  <div className="flex items-center gap-2 text-gray-500 animate-bounce">
                    <span className="text-sm">Scroll for more</span>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                )}
              </div>
              <div className="max-w-lg mx-auto p-8 bg-white shadow-xl rounded-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Header */}
                  <h2 className="text-3xl font-bold text-gray-800 text-center">
                    Add Your Comment
                  </h2>

                  {/* Textarea for Comment */}
                  <div>
                    <label
                      htmlFor="comment"
                      className="block text-sm font-medium text-gray-600 mb-2"
                    >
                      Your Comment
                    </label>
                    <textarea
                      id="comment"
                      value={comment}
                      onChange={handleCommentChange}
                      placeholder="Write your comment..."
                      rows={2}
                      className="w-full p-4 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>

                  {/* Input for Location */}
                  <div>
                    <label
                      htmlFor="location"
                      className="block text-sm font-medium text-gray-600 mb-2"
                    >
                      Location (optional)
                    </label>
                    <input
                      id="location"
                      type="text"
                      value={location}
                      onChange={handleLocationChange}
                      placeholder="Enter location"
                      className="w-full p-4 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>

                  {/* File Input */}
                  <div>
                    <label
                      htmlFor="image"
                      className="block text-sm font-medium text-gray-600 mb-2"
                    >
                      Upload an Image
                    </label>
                    <input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-400 transition-all"
                    />
                  </div>

                  {/* Image Preview */}
                  {image && (
                    <div className="mt-6">
                      <h4 className="text-lg font-medium text-gray-700">
                        Image Preview
                      </h4>
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Preview"
                        className="mt-4 w-full max-w-xs mx-auto rounded-lg shadow-lg"
                      />
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-lg hover:opacity-90 shadow-md focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all"
                  >
                    Post Comment
                  </button>
                </form>
              </div>
              <div className="space-y-6 pb-20">
                {posts?.length > 0 ? (
                  posts?.map((post) => (
                    <div
                      key={post.id}
                      className="bg-white rounded-xl p-5 shadow-sm hover:shadow-lg transition-shadow duration-300 border-t border-gray-200"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                          {post.author?.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {post.user}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {post.created_at}
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-800 leading-relaxed mb-4">
                        {post.text}
                      </p>

                      {post.images && (
                        <div className="rounded-lg overflow-hidden mb-4">
                          <img
                            src={post.image}
                            alt="Post visual"
                            className="w-full h-60 object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}

                      <div className="flex items-center justify-between text-gray-600 border-t border-gray-200 pt-4 mt-4">
                        {/* Upvote/Downvote Section */}
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-green-100 rounded-lg transition-colors">
                            onClick={handleUpvote}
                            <ArrowUp className="h-5 w-5 text-green-600" />
                            <span className="text-sm font-medium text-gray-700">
                              {post.upvotes}
                            </span>
                          </button>
                          <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-red-100 rounded-lg transition-colors">
                          onClick={handleDownvote}
                            <ArrowDown className="h-5 w-5 text-red-600" />
                            <span className="text-sm font-medium text-gray-700">
                              {post.downvotes}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500">
                    No posts available
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
