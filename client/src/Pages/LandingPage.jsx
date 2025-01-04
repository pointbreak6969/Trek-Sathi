import React from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Menu, MapPin, Bookmark, Sun, Moon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "../components/tabs";
import { Button } from "@/components/button";
import { useTheme } from "../components/theme-provider"; // You'll need to create this
import { useSelector } from "react-redux";
import mardiImage from "../assets/mardi.jpg";
import abcImage from "../assets/abc.jpg";
import everestImage from "../assets/everest.jpg";
import langtangImage from "../assets/langtang.jpg";
import manasluImage from "../assets/manaslu.jpg";
import Navbar from "../components/Navbar";

export default function Home() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-12 text-center md:text-left">
          Book your private adventure
        </h1>

        {/* Activities */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-center md:text-left">
            Your Personal Diary
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
            {activities.map((activity) => (
              <button
                key={activity.name}
                className={`flex flex-col items-center px-8 py-4 rounded-full border ${
                  activity.name === "Hiking"
                    ? "bg-[#6366f1] text-white"
                    : "bg-white hover:bg-gray-50"
                }`}
                onClick={() => navigate(`/details/${activity.id}`)}
              >
                <div className="w-12 h-12 flex items-center justify-center mb-2">
                  {activity.icon}
                </div>
                <span className="whitespace-nowrap">{activity.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Tabs */}
        <Tabs defaultValue="recommended" className="mb-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3">
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Destinations */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <div
              key={destination.name}
              className="relative rounded-3xl overflow-hidden aspect-[4/3]"
              onClick={() => navigate(`/details/${destination.id}`)}
            >
              <img
                src={destination.image}
                src={destination.image}
                alt={destination.name}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-2xl font-bold mb-2">{destination.name}</h3>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{destination.location}</span>
                </div>
              </div>
              <button className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm">
                <Bookmark className="h-5 w-5 text-white" />
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

const activities = [
  {
    name: "Kayaking",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M21.12 16.23a5.43 5.43 0 01-2.38-1.69c-.36-.48-.53-1.21-.78-1.84a4.6 4.6 0 00-4.05-2.76 4.15 4.15 0 00-3.17 1.7 11.68 11.68 0 00-1.76 3.07c-.4.93-.77 1.87-1.16 2.81-.34.81-.72 1.6-1.07 2.4l-1.44-.61c.35-.8.73-1.6 1.07-2.41.39-.93.76-1.87 1.15-2.8A12.87 12.87 0 018.7 11.3a5.62 5.62 0 014.29-2.35 6.05 6.05 0 015.38 3.65c.26.64.43 1.37.79 1.85a4.11 4.11 0 001.75 1.22zM8.89 7.5A2.5 2.5 0 117.5 5a2.5 2.5 0 011.39 2.5z" />
      </svg>
    ),
  },
  
  // Add remaining activities here
];

const destinations = [
  {
    name: "Mardi Base Camp",
    id: "mardi",
    location: "Nepal",
    image: mardiImage,
  },
  {
    name: "Annapurna Base Camp",
    id: "abc",
    location: "Nepal",
    image: abcImage,
  },
  {
    name: "Everest Base Camp",
    id: "everest",
    location: "Nepal",
    image: everestImage,
  },
  {
    name: "Langtang Valley",
    id: "langtang",
    location: "Nepal",
    image: langtangImage,
  },
  {
    name: "Manaslu Circuit",
    id: "manaslu",
    location: "Nepal",
    image: manasluImage,
  },
];
