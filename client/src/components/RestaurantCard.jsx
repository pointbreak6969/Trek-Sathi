import React from 'react';
import { Star, DollarSign, Clock, MapPin, Phone } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const RestaurantCard = ({ restaurants }) => {
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  const renderPriceRange = (range) => {
    return Array(3).fill(0).map((_, i) => (
      <DollarSign 
        key={i} 
        className={`w-4 h-4 ${i < range ? 'text-green-600' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="w-full">
      <Carousel 
        opts={{
          align: "start",
          loop: true,
        }}
        className="relative max-w-5xl mx-auto"
      >
        <CarouselContent>
          {restaurants.map((restaurant, index) => (
            <CarouselItem key={index} className="basis-full">
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="lg:flex">
                    <div className="relative lg:w-1/2">
                      <img 
                        src={restaurant.image} 
                        alt={restaurant.name}
                        className="w-full h-64 lg:h-full object-cover"
                      />
                      <Badge className="absolute top-3 right-3 bg-white/90 text-black">
                        {restaurant.cuisine}
                      </Badge>
                    </div>
                    <div className="p-6 lg:w-1/2 lg:flex lg:flex-col lg:justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                          {restaurant.name}
                        </h3>
                        
                        <div className="flex  flex-col mb-4">
                          <div className="flex space-x-1">
                            {renderStars(restaurant.rating)}
                            <span className="ml-2 text-gray-600">({restaurant.rating})</span>
                          </div>
                          <div className="flex space-x-1">
                            {renderPriceRange(restaurant.priceRange)}
                          </div>
                        </div>

                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {restaurant.description}
                        </p>

                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                            <span>{restaurant.hours}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                            <span>{restaurant.address}</span>
                          </div>
                          <div className="flex items-center">
                            <Phone className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                            <span>{restaurant.phone}</span>
                          </div>
                        </div>
                      </div>

                      <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200">
                        Make a Reservation
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute -left-12 top-1/2 hover:bg-blue-50" />
        <CarouselNext className="absolute -right-12 top-1/2 hover:bg-blue-50" />
      </Carousel>
    </div>
  );
};

export default RestaurantCard;