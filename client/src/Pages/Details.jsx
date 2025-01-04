import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import mardi from "../assets/mardi.jpg";
import abc from "../assets/abc.jpg";
import everest from "../assets/everest.jpg";
import langtang from "../assets/langtang.jpg";
import manaslu from "../assets/manaslu.jpg";
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
  const navigate = useNavigate();

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

  const posts = [
    {
      id: 1,
      author: "Trek Guide Nepal",
      authorRole: "Certified Guide",
      content: `Currently at ${details.name}! The weather is perfect for trekking with clear skies and moderate temperatures. Today's temperature: 15°C at base camp.`,
      likes: 145,
      images: [details.image],
      timeAgo: "2 hours ago",
      comments: 23,
      photos: 4,
      verified: true,
    },
    {
      id: 2,
      author: "Mountain Explorer",
      authorRole: "Adventure Photographer",
      content: `Dawn patrol at ${details.name} was absolutely worth it! The sunrise view of the mountains is beyond description. Pro tip: Start early to avoid afternoon clouds.`,
      likes: 232,
      images: [details.image],
      timeAgo: "5 hours ago",
      comments: 45,
      photos: 12,
      verified: true,
    },
    {
      id: 3,
      author: "Nepal Trekking Updates",
      authorRole: "Official Channel",
      content: `Trail Conditions Update for ${details.name}: All paths are clear and well-maintained. Recent weather has been favorable for trekking. Remember to check in at all registration points.`,
      likes: 89,
      timeAgo: "1 day ago",
      comments: 15,
      photos: 0,
      verified: true,
    },
    {
      id: 4,
      author: "Himalayan Weather",
      authorRole: "Weather Service",
      content: `Weekly forecast for ${details.name}: Clear skies expected with light afternoon clouds. Temperature range: 5°C to 18°C. Perfect trekking conditions!`,
      likes: 167,
      timeAgo: "2 days ago",
      comments: 28,
      photos: 2,
      verified: true,
    },
    {
      id: 5,
      author: "Local Tea House",
      authorRole: "Business Owner",
      content:
        "Welcome trekkers! We've just restocked our supplies and updated our menu with seasonal specialties. Hot ginger tea and dal bhat waiting for you!",
      likes: 93,
      images: [details.image],
      timeAgo: "3 days ago",
      comments: 31,
      photos: 6,
    },
    {
      id: 6,
      author: "Mountain Rescue Nepal",
      authorRole: "Safety Service",
      content: `Safety Update: All emergency shelters along ${details.name} route have been restocked with supplies. Remember to carry your safety beacon and register your trek.`,
      likes: 284,
      timeAgo: "4 days ago",
      comments: 42,
      photos: 4,
      verified: true,
    },
  ];

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
                onClick={() => navigate(`/groupformation/${id}`)}
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

              <div className="space-y-6 pb-20">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white rounded-xl p-5 hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                        {post.author.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {post.author}
                        </h4>
                        <p className="text-sm text-gray-500">{post.timeAgo}</p>
                      </div>
                    </div>

                    <p className="text-gray-700 leading-relaxed mb-4">
                      {post.content}
                    </p>

                    {post.images && (
                      <div className="rounded-xl overflow-hidden mb-4 shadow-md">
                        <img
                          src={post.images[0]}
                          alt="Trek view"
                          className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    <div className="flex items-center gap-6 text-gray-600">
                      <button className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                        <MessageCircle className="h-5 w-5" />
                        <span className="text-sm font-medium">
                          {post.comments}
                        </span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                        <Image className="h-5 w-5" />
                        <span className="text-sm font-medium">
                          {post.photos}
                        </span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-red-600 transition-colors ml-auto">
                        <Heart className="h-5 w-5" />
                        <span className="text-sm font-medium">
                          {post.likes}
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
