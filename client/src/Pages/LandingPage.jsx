import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Menu,
  MapPin,
  Bookmark,
  Sun,
  Moon,
  Users,
  Calendar,
  Search,
  Filter,
  ChevronRight,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "../components/theme-provider";
import mardiImage from "@/assets/mardi.jpg";
import abcImage from "@/assets/abc.jpg";
import everestImage from "@/assets/everest.jpg";
import langtangImage from "@/assets/langtang.jpg";
import manasluImage from "@/assets/manaslu.jpg";

export default function Home() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {theme === "light" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-8">
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Popular Treks</h2>
            <Tabs defaultValue="all" className="w-auto">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="easy">Easy</TabsTrigger>
                <TabsTrigger value="moderate">Moderate</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination) => (
              <div
                key={destination.id}
                className="group relative rounded-xl overflow-hidden aspect-[4/3] cursor-pointer"
                onClick={() => navigate(`/trek/${destination.id}`)}
              >
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="object-cover w-full h-full transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-xl font-bold mb-1">{destination.name}</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{destination.location}</span>
                    </div>
                    <Badge variant="secondary" className="bg-white/20">
                      {destination.duration} days
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 text-white hover:text-white bg-black/20 hover:bg-black/40 backdrop-blur-sm"
                >
                  <Bookmark className="h-5 w-5" />
                </Button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

const destinations = [
  {
    name: "Mardi Base Camp",
    id: "mardi",
    location: "Nepal",
    image: mardiImage,
    duration: 7,
  },
  {
    name: "Annapurna Base Camp",
    id: "abc",
    location: "Nepal",
    image: abcImage,
    duration: 12,
  },
  {
    name: "Everest Base Camp",
    id: "everest",
    location: "Nepal",
    image: everestImage,
    duration: 14,
  },
  {
    name: "Langtang Valley",
    id: "langtang",
    location: "Nepal",
    image: langtangImage,
    duration: 8,
  },
  {
    name: "Manaslu Circuit",
    id: "manaslu",
    location: "Nepal",
    image: manasluImage,
    duration: 15,
  },
];
