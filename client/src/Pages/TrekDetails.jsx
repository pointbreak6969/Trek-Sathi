import React, { useState } from "react";
import {
  FaComments,
  FaStar,
  FaBus,
  FaHotel,
  FaMountain,
  FaBed,
  FaUtensils,
  FaWalking,
  FaMapMarkerAlt,
} from "react-icons/fa";
import mardi from "../assets/mardi.jpg";

const TrekDetails = () => {
  const [reviews, setReviews] = useState([]);
  const [comments, setComments] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);

  const exampleHotels = [
    { name: "Hotel Machhapuchhre", number: "9860000000", rating: 4.5 },
    { name: "Hotel Annapurna", number: "9877000006", rating: 4.0 },
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

  const detailedItinerary = [
    {
      day: 1,
      title: "Arrive in Pokhara",
      description:
        "Arrive in Pokhara, the gateway to the Annapurna region. Enjoy the beautiful lakeside city and prepare for your trek.",
      elevation: "827m",
      distance: "N/A",
      accommodation: "Hotel in Pokhara",
      meals: "Welcome Dinner",
      image: mardi,
      mealLocations: [
        { type: "Breakfast", location: "Pokhara Lakeside" },
        { type: "Lunch", location: "Pokhara Restaurant" },
        { type: "Dinner", location: "Hotel Restaurant" },
      ],
      hotels: exampleHotels,
      reviews: ["Great experience!", "Lovely place to stay."],
      comments: [
        {
          avatar: "https://via.placeholder.com/40",
          text: "Amazing trek!",
        },
      ],
      transport: "Bus 9800000000, Jeep 9800000009",
    },
    {
      day: 2,
      title: "Drive to Kande and Trek to Forest Camp",
      description:
        "After a short drive to Kande, begin your trek through rhododendron forests to reach Forest Camp.",
      elevation: "2,520m",
      distance: "5-6 hours",
      accommodation: "Tea House",
      meals: "Breakfast, Lunch, Dinner",
      image: "/images/forest-camp.jpg",
      mealLocations: [
        { type: "Breakfast", location: "Forest Camp" },
        { type: "Lunch", location: "Forest Camp" },
        { type: "Dinner", location: "Forest Camp" },
      ],
      hotels: exampleHotels,
      reviews: ["Beautiful forest!", "Great hike."],
      comments: [
        {
          avatar: "https://via.placeholder.com/40",
          text: "Stunning views!",
        },
      ],
      transport: "Jeep 5678",
    },
    // Add more days as needed
  ];

  const handleChatToggle = () => {
    setChatOpen(!chatOpen);
  };

  const [expandedDays, setExpandedDays] = useState(detailedItinerary.map(day => day.day));

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
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Trek Details</h1>

      {/* Itinerary */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Itinerary</h2>
        <div className="relative">
          <div className="absolute left-0 top-0 w-1 bg-gray-300 h-full"></div>
          {itinerary.map((day, index) => (
            <div key={index} className="relative mb-6">
              <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white rounded-full p-2 shadow-lg">
                Day {day.day}
              </div>
              <div className="ml-10">
                {day.activities.map((activity, idx) => (
                  <div key={idx} className="mb-4">
                    <div className="text-lg font-semibold text-gray-700">
                      {activity.description}
                    </div>
                    {activity.transport && (
                      <div className="text-gray-600 flex items-center">
                        <FaBus className="mr-2" />
                        {activity.transport}
                      </div>
                    )}
                    {activity.hotel && (
                      <div className="text-gray-600 flex items-center">
                        <FaHotel className="mr-2" />
                        {activity.hotel}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Detailed Itinerary */}
      <section className="my-12 px-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Detailed Itinerary
      </h2>
      <div className="space-y-8">
        {detailedItinerary.map((day, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div
              className="bg-blue-600 text-white py-4 px-6 cursor-pointer flex justify-between items-center"
              onClick={() => toggleDay(day.day)}
            >
              <h3 className="text-2xl font-semibold">
                Day {day.day}: {day.title}
              </h3>
              <span>{expandedDays.includes(day.day) ? "▲" : "▼"}</span>
            </div>
            {expandedDays.includes(day.day) && (
              <div className="p-6">
                <div className="mb-6">
                  <img
                    src={day.image}
                    alt={`Day ${day.day} - ${day.title}`}
                    className="rounded-lg object-cover w-full h-full"
                  />
                </div>
                <p className="text-gray-700 mb-4">{day.description}</p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-gray-600">
                    <FaMountain className="mr-2 text-blue-600" />
                    <span>Elevation: {day.elevation}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaWalking className="mr-2 text-blue-600" />
                    <span>Distance: {day.distance}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaBed className="mr-2 text-blue-600" />
                    <span>Accommodation: {day.accommodation}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaUtensils className="mr-2 text-blue-600" />
                    <span>Meals: {day.meals}</span>
                  </div>
                  {day.transport && (
                    <div className="flex items-center text-gray-600">
                      <FaBus className="mr-2 text-blue-600" />
                      <span>Transport: {day.transport}</span>
                    </div>
                  )}
                </div>

                {/* Meal Locations */}
                <div className="mb-6">
                  <h4 className="text-xl font-semibold text-gray-700 mb-2">
                    Meal Locations
                  </h4>
                  <ul className="space-y-2">
                    {day.mealLocations.map((meal, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-gray-600"
                      >
                        <FaMapMarkerAlt className="mr-2 text-blue-600" />
                        <span>
                          <strong>{meal.type}:</strong> {meal.location}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Hotels */}
                <div className="mb-6">
                  <h4 className="text-xl font-semibold text-gray-700 mb-2">
                    Hotels
                  </h4>
                  <ul className="space-y-2">
                    {day.hotels.map((hotel, idx) => (
                      <li key={idx} className="text-gray-700">
                        <strong>{hotel.name}:</strong> {hotel.number}
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={
                                i < hotel.rating
                                  ? "text-yellow-500"
                                  : "text-gray-300"
                              }
                            />
                          ))}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Reviews */}
                <div className="mb-6">
                  <h4 className="text-xl font-semibold text-gray-700 mb-2">
                    Reviews
                  </h4>
                  <ul className="space-y-2">
                    {day.reviews.map((review, idx) => (
                      <li key={idx} className="text-gray-700">
                        {review}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Comments */}
                {/* <div className="mb-6">
                  <h4 className="text-xl font-semibold text-gray-700 mb-2">
                    Comments
                  </h4>
                  <ul className="space-y-2">
                    {day.comments.map((comment, idx) => (
                      <li
                        key={idx}
                        className="text-gray-700 flex items-center"
                      >
                        <img
                          src={
                            comment.avatar || "https://via.placeholder.com/40"
                          }
                          alt="User"
                          className="rounded-full mr-2 w-10 h-10"
                        />
                        <span>{comment.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>  */}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>

      {/* Floating Chat Button */}
      <div className="fixed bottom-4 right-4">
        <button
          className="bg-blue-500 text-white p-3 rounded-full shadow-lg"
          onClick={handleChatToggle}
        >
          <FaComments size={24} />
        </button>
      </div>

      {/* Chat Pop-up */}
      {chatOpen && (
        <div className="fixed bottom-20 right-4 w-64 bg-white border rounded-lg shadow-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Group Chat</h3>
          <div className="h-48 overflow-auto mb-2">
            {comments.map((comment, index) => (
              <div key={index} className="mb-1">
                <strong>User {index + 1}:</strong> {comment}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrekDetails;
