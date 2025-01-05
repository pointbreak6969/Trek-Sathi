import { useState, useRef } from "react";

export function Treks({ locations }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollContainerRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Explore <span className="text-[#6366f1]">Our Trekking Adventures</span>
          </h2>
          <p className="text-gray-600">
            Embark on an unforgettable journey through breathtaking landscapes. We offer a variety of treks to suit all experience levels, from gentle hikes to challenging expeditions.
          </p>
        </div>
        <div className="relative">
          <div 
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto pb-8 snap-x cursor-grab active:cursor-grabbing no-scrollbar"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {locations.map((location, index) => (
              <div
                key={index}
                className="w-72 flex-shrink-0 snap-start"
              >
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                  <img
                    src={location.imageUrl}
                    alt={location.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white">{location.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {locations.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === activeIndex ? 'bg-[#6366f1]' : 'bg-gray-300'
                }`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Add this to your global CSS file
const styles = `
  @layer utilities {
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  }
`;