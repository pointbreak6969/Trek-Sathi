import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

function Services({ services }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((current) =>
      current === services.length - visibleServices ? 0 : current + 1
    );
  };

  const previous = () => {
    setCurrentIndex((current) =>
      current === 0 ? services.length - visibleServices : current - 1
    );
  };

  const visibleServices = window.innerWidth >= 1024 ? 4 : window.innerWidth >= 768 ? 2 : 1;

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Our <span className="text-[#6366f1]">Services</span>
          </h2>
          <p className="text-gray-600">
            Explore our range of exciting outdoor adventures, from challenging mountain climbs to scenic hiking trails. 
            We offer a variety of options to suit all skill levels and interests.
          </p>
        </div>

        <div className="relative">
          <div className="flex gap-6 overflow-hidden">
            {services.slice(currentIndex, currentIndex + visibleServices).map((service, index) => (
              <div key={index} className="w-full md:w-1/2 lg:w-1/4 flex-shrink-0">
                <div className="relative group rounded-2xl overflow-hidden">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    width={300}
                    height={400}
                    className="w-full aspect-[3/4] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                    <p className="text-gray-200 mb-4">{service.description}</p>
                    <Button variant="outline" className="bg-white hover:bg-[#6366f1] hover:text-white transition-colors">
                      Enquire Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={previous}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-[#6366f1] hover:text-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={next}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-[#6366f1] hover:text-white transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Services;