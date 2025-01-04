import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { MapPin, Bookmark, Mountain, Calendar, Book, Clock, ArrowRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import mardiImage from "@/assets/mardi.jpg";
import abcImage from "@/assets/abc.jpg";
import everestImage from "@/assets/everest.jpg";
import langtangImage from "@/assets/langtang.jpg";
import manasluImage from "@/assets/manaslu.jpg";
import { useSelector } from 'react-redux';
import ChatBotIcon from '@/components/ChatBotIcon';

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
    }
  ];

  const journalEntries = [
    {
      title: "Sunrise at Poon Hill",
      trek: "Annapurna Base Camp",
      date: "December 15, 2023",
      excerpt: "Watching the sun rise over the Annapurna range was breathtaking...",
    },
    {
      title: "Village Life in Langtang",
      trek: "Langtang Valley",
      date: "October 10, 2023",
      excerpt: "The warm hospitality of the local Tamang community...",
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
   <div className='fixed bottom-6 right-6 z-50'>
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

        {/* Past Treks Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Your Past Treks
            </h2>
            <Button variant="ghost" className="text-blue-600">
              View All <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
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
          <div className="grid md:grid-cols-2 gap-6">
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

        {/* Upcoming Treks Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Recommended Treks
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <h3 className="text-2xl font-bold mb-2">{destination.name}</h3>
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

const activities = [
  {
    name: "Kayaking",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M21.12 16.23a5.43 5.43 0 01-2.38-1.69c-.36-.48-.53-1.21-.78-1.84a4.6 4.6 0 00-4.05-2.76 4.15 4.15 0 00-3.17 1.7 11.68 11.68 0 00-1.76 3.07c-.4.93-.77 1.87-1.16 2.81-.34.81-.72 1.6-1.07 2.4l-1.44-.61c.35-.8.73-1.6 1.07-2.41.39-.93.76-1.87 1.15-2.8A12.87 12.87 0 018.7 11.3a5.62 5.62 0 014.29-2.35 6.05 6.05 0 015.38 3.65c.26.64.43 1.37.79 1.85a4.11 4.11 0 001.75 1.22zM8.89 7.5A2.5 2.5 0 117.5 5a2.5 2.5 0 011.39 2.5z" />
      </svg>
    ),
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
