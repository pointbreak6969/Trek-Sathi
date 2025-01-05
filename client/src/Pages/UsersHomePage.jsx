import React from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  ArrowRight,
  Shield,
  Truck,
  RefreshCcw,
  ShoppingBag,
  Calendar,
  Clock,
  Book,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import mardiImage from "@/assets/mardi.jpg";
import abcImage from "@/assets/abc.jpg";
import everestImage from "@/assets/everest.jpg";
import langtangImage from "@/assets/langtang.jpg";
import manasluImage from "@/assets/manaslu.jpg";
import { useSelector } from "react-redux";
import ChatBotIcon from "@/components/ChatBotIcon";

export default function UserHomePage() {
  const navigate = useNavigate();

  const username = useSelector((state) => state.auth.userData.fullName);

  const pastTreks = [
    {
      name: "Annapurna Base Camp",
      date: "December 2023",
      duration: "12 days",
      image: abcImage,
    },
    {
      name: "Langtang Valley",
      date: "October 2023",
      duration: "8 days",
      image: langtangImage,
    },
  ];

  const journalEntries = [
    {
      title: "Sunrise at Poon Hill",
      trek: "Annapurna Base Camp",
      date: "December 15, 2023",
      excerpt:
        "Watching the sun rise over the Annapurna range was breathtaking...",
    },
    {
      title: "Village Life in Langtang",
      trek: "Langtang Valley",
      date: "October 10, 2023",
      excerpt: "The warm hospitality of the local Tamang community...",
    },
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="fixed bottom-6 right-6 z-50">
        <ChatBotIcon />
      </div>
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            Welcome back, {username}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Ready for your next mountain adventure?
          </p>
        </div>

        {/* Gear Advertisement Section */}
        <section className="mb-8 sm:mb-12">
          <div className="bg-blue-50 dark:bg-gray-800 p-4 sm:p-6 lg:p-8 rounded-xl shadow-md">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center flex-1 gap-4 sm:gap-6">
                <img
                  src="/trekkinggear.jpg"
                  alt="Trekking Gear"
                  className="w-full sm:w-32 h-48 sm:h-32 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white">
                    Get Premium Trekking Gear from{" "}
                    <span className="text-[#6366f1] dark:text-blue-400 block sm:inline">
                      Mountain Equipment Nepal
                    </span>
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-2">
                    Exclusive 20% discount for registered trekkers. Premium quality gear for your Himalayan adventures!
                  </p>
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-3">
                    <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                      <Shield className="w-4 h-4 mr-1" />
                      Quality Guaranteed
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                      <Truck className="w-4 h-4 mr-1" />
                      Free Delivery
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                      <RefreshCcw className="w-4 h-4 mr-1" />
                      Easy Returns
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto">
                <Button className="bg-[#6366f1] text-white hover:bg-blue-700 px-4 sm:px-6 py-2">
                  Shop Now <ShoppingBag className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" className="text-[#6366f1] border-blue-600">
                  View Catalog
                </Button>
              </div>
            </div>
          </div>
        </section>


        {/* Past Treks Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Your Past Treks
            </h2>
            <Button variant="ghost" className="text-[#6366f1]">
              View All <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastTreks.map((trek) => (
              <Card key={trek.name} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={trek.image}
                      alt={trek.name}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="text-xl font-bold mb-1">{trek.name}</h3>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {trek.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {trek.duration}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Trek Journal Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Your Trek Journal
            </h2>
            <Button variant="ghost" className="text-blue-600">
              View All <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {journalEntries.map((entry) => (
              <Card key={entry.title} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{entry.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {entry.trek} • {entry.date}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                        {entry.excerpt}
                      </p>
                    </div>
                    <Book className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recommended Treks Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Recommended Treks
            </h2>
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((destination) => (
              <Card
                key={destination.name}
                className="group overflow-hidden rounded-xl transition-all duration-300 hover:shadow-xl cursor-pointer"
                onClick={() => navigate(`/details/${destination.id}`)}
              >
                <CardContent className="p-0 relative">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">
                      {destination.name}
                    </h3>
                    <div className="flex items-center gap-2 opacity-90">
                      <MapPin className="h-4 w-4" />
                      <span>{destination.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
