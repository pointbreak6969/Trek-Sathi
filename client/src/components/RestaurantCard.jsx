import React from 'react';
import { Star, DollarSign, Clock, MapPin, Phone } from 'lucide-react';

const RestaurantCard = ({ restaurant }) => {
  const { name, cuisine, rating, priceRange, hours, address, phone, description, image } = restaurant;

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star key={i} className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
    ));
  };

  const renderPriceRange = (range) => {
    return Array(3).fill(0).map((_, i) => (
      <DollarSign key={i} className={`w-5 h-5 ${i < range ? 'text-green-600' : 'text-gray-300'}`} />
    ));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <img className="w-full h-64 object-cover object-center" src={image} alt={name} />
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{name}</h2>
        <p className="text-gray-600 text-sm mb-4">{cuisine}</p>
        <div className="flex items-center mb-4">
          <div className="flex mr-2">
            {renderStars(rating)}
          </div>
          <span className="text-gray-600 text-sm">{rating} out of 5</span>
        </div>
        <div className="flex items-center mb-4">
          <div className="flex mr-2">
            {renderPriceRange(priceRange)}
          </div>
          <span className="text-gray-600 text-sm">Price Range</span>
        </div>
        <div className="flex items-center mb-2">
          <Clock className="w-5 h-5 text-gray-500 mr-2" />
          <span className="text-gray-600 text-sm">{hours}</span>
        </div>
        <div className="flex items-center mb-2">
          <MapPin className="w-5 h-5 text-gray-500 mr-2" />
          <span className="text-gray-600 text-sm">{address}</span>
        </div>
        <div className="flex items-center mb-4">
          <Phone className="w-5 h-5 text-gray-500 mr-2" />
          <span className="text-gray-600 text-sm">{phone}</span>
        </div>
        <p className="text-gray-700 leading-relaxed mb-4">{description}</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
          Make a Reservation
        </button>
      </div>
    </div>
  );
};

export default RestaurantCard;