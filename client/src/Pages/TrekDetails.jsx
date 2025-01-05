// src/components/TrekDetails.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaComments, FaBus, FaHotel, FaStar, FaPhone } from "react-icons/fa";
import mardi from "../assets/mardi.jpg";
import RestaurantCard from "@/components/RestaurantCard";
import ChatBotIcon from "@/components/ChatBotIcon";

const TrekDetails = () => {
  const [reviews, setReviews] = useState([]);
  const [comments, setComments] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);

  const restaurants = [
    {
      name: "Maison Française",
      cuisine: "French",
      rating: 4.8,
      priceRange: 4,
      hours: "Mon-Fri: 12:00 PM - 10:00 PM, Sat-Sun: 10:00 AM - 11:00 PM",
      address: "45 Rue de Provence, Paris, France 75009",
      phone: "+33 1 42 68 53 12",
      description:
        "Maison Française invites you to indulge in authentic French cuisine in the heart of Paris. With a menu curated by our award-winning chefs, we bring traditional French recipes to life using locally-sourced ingredients. Perfect for romantic dinners or special occasions, our ambiance combines timeless elegance with contemporary comfort.",
      image:
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/283798490.jpg?k=b7e235390d9f309f8e32221378ce48f55e4dd34eff32e365ab9e4e98d7bc3c66&o=&hp=1",
    },
    {
      name: "Maison Française",
      cuisine: "French",
      rating: 4.8,
      priceRange: 4,
      hours: "Mon-Fri: 12:00 PM - 10:00 PM, Sat-Sun: 10:00 AM - 11:00 PM",
      address: "45 Rue de Provence, Paris, France 75009",
      phone: "+33 1 42 68 53 12",
      description:
        "Maison Française invites you to indulge in authentic French cuisine in the heart of Paris. With a menu curated by our award-winning chefs, we bring traditional French recipes to life using locally-sourced ingredients. Perfect for romantic dinners or special occasions, our ambiance combines timeless elegance with contemporary comfort.",
      image:
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/283798490.jpg?k=b7e235390d9f309f8e32221378ce48f55e4dd34eff32e365ab9e4e98d7bc3c66&o=&hp=1",
    },
  ];
  const itinerary = [
    {
      day: 1,
      activities: [
        { description: "Trek starts from Kathmandu", transport: "Bus" },
        { description: "Ride to Pokhara", transport: "Jeep" },
      ],
    },
    {
      day: 2,
      activities: [
        { description: "Trek from Pokhara to Ghorepani", transport: "On foot" },
        { description: "Stay in Ghorepani", hotel: "Hotel Ghorepani" },
      ],
    },
    {
      day: 3,
      activities: [
        {
          description: "Trek from Ghorepani to Poon Hill",
          transport: "On foot",
        },
        { description: "Return to Pokhara", transport: "Jeep 5678" },
      ],
    },
  ];

  const trekkingAgencies = [
    {
      name: "Himalayan Adventure Treks",
      contact: "9851234567",
      rating: 4.8,
      image: mardi,
    },
    {
      name: "Everest Base Camp Treks",
      contact: "9847654321",
      rating: 4.7,
      image:
        "https://i.natgeofe.com/k/578a6a47-3514-4d36-bf4b-254fa7c49c45/nepal-prayer-flags_16x9.jpg?w=1200",
    },
    {
      name: "Annapurna Circuit Treks",
      contact: "9812345678",
      rating: 4.6,
      image:
        "https://www.rjtravelagency.com/wp-content/uploads/2023/10/Nepal.jpg",
    },
  ];

  const handleChatToggle = () => {
    setChatOpen(!chatOpen);
  };

  const [expandedDays, setExpandedDays] = useState(
    itinerary.map((day) => day.day)
  );

  const toggleDay = (day) => {
    setExpandedDays((prevExpandedDays) => {
      if (prevExpandedDays.includes(day)) {
        return prevExpandedDays.filter((expandedDay) => expandedDay !== day);
      } else {
        return [...prevExpandedDays, day];
      }
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl bg-white shadow-lg rounded-lg">
      <div className="fixed bottom-6 right-6 z-50">
        <ChatBotIcon />
      </div>
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
              Trek Details
            </h1>
            <div className="h-1 w-20 bg-indigo-600 mt-2 rounded-full"></div>
          </div>
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-lg">
            <div className="text-md font-bold text-indigo-600">
              NPR 6000-9000 <span>*</span>
            </div>
          </div>
        </div>
      </div>

      {/* Itinerary */}
      <section className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-700 mb-6 text-center">
          Itinerary
        </h2>
        <div className="relative">
          <div className="absolute left-4 top-0 w-1 bg-gray-300 h-full"></div>
          {itinerary.map((day, index) => (
            <div key={index} className="relative mb-10 ">
              <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white rounded-full p-3 shadow-lg">
                Day {day.day}
              </div>
              <div className="ml-14 pl-6 border-l-2 border-gray-300">
                {day.activities.map((activity, idx) => (
                  <div key={idx} className="mb-6">
                    <div className="text-lg font-semibold text-gray-800 mb-2">
                      {activity.description}
                    </div>
                    {activity.transport && (
                      <div className="text-gray-600 flex items-center mb-1">
                        <FaBus className="mr-2 text-blue-500" />
                        <span>{activity.transport}</span>
                      </div>
                    )}
                    {activity.hotel && (
                      <div className="text-gray-600 flex items-center mb-1">
                        <FaHotel className="mr-2 text-blue-500" />
                        <span>{activity.hotel}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Advertisement Section */}
      <section className="mb-8">
        <div className="bg-yellow-100 p-6 rounded-lg shadow-md flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="https://www.state.gov/wp-content/uploads/2023/07/shutterstock_655126330v2.jpg"
              alt="Adventure Travel"
              className="w-24 h-24 rounded-full mr-4"
            />
            <div>
              <h3 className="text-2xl font-semibold text-gray-800">
                Travel with{" "}
                <span className="text-yellow-600">Adventure Travel Co.</span>
              </h3>
              <p className="text-gray-600 mt-2">
                Best trekking experiences and exclusive packages. Book your
                adventure now!
              </p>
            </div>
          </div>
          <div>
            <button className="bg-yellow-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-yellow-600">
              Learn More
            </button>
          </div>
        </div>
      </section>
      <section className="py-12">
  <div className="py-12 px-4 sm:px-6 lg:px-8">
    <RestaurantCard restaurants={restaurants} />
  </div>
</section>

      {/* Trekking Agencies */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          Trekking Agencies
        </h2>
        <div className="space-y-4">
          {trekkingAgencies.map((agency, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between"
            >
              <div className="flex items-center">
                <img
                  src={agency.image}
                  alt={agency.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div className="text-lg font-semibold text-gray-700">
                  {agency.name}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-gray-600 flex items-center">
                  <FaPhone className="mr-2" />
                  {agency.contact}
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < agency.rating ? "text-yellow-500" : "text-gray-300"
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Link to Detailed Itinerary */}
      <div className="text-center mb-6">
        <Link
          to="/DetailedItinerary"
          className="bg-blue-600 text-white py-2 px-4 rounded shadow"
        >
          View Detailed Itinerary
        </Link>
      </div>

     
      
    </div>
  );
};

export default TrekDetails;
