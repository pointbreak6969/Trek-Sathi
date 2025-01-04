import { useState } from "react"



export function Treks({ locations }) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Explore <span className="text-sky-500">The Treks</span>
          </h2>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore Lorem ipsum dolor sit magna aliqua.
          </p>
        </div>

        <div className="relative">
          <div className="flex gap-4 overflow-x-auto pb-8 snap-x">
            {locations.map((location, index) => (
              <div
                key={index}
                className="w-72 flex-shrink-0 snap-start"
              >
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                  <img
                    src={location.imageUrl}
                    alt={location.name}
                    fill
                    className="object-cover h-full"
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
                  index === activeIndex ? 'bg-sky-500' : 'bg-gray-300'
                }`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

