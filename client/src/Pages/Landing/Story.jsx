import { Button } from "@/components/ui/button"

export function Story() {
  return (
    <section className="py-24 bg-gray-50">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="rounded-3xl overflow-hidden">
          <img
            src="/story-image.webp"
            alt="Our Story"
            width={600}
            height={400}
            className="w-full object-cover"
          />
        </div>
  
        <div className="space-y-6">
          <h2 className="text-4xl font-bold">
            Our <span className="text-sky-500">Story</span>
          </h2>
          <div className="space-y-4 text-gray-600">
            <p>
              We are passionate about exploring the outdoors and sharing our love of nature with others. 
              Our journey began with a small group of friends who shared a common passion for adventure.
            </p>
            <p>
              Over the years, we have grown into a thriving community of outdoor enthusiasts, providing 
              high-quality gear, expert guidance, and unforgettable experiences for adventurers of all levels. 
            </p>
          </div>
          <Button size="lg" className="bg-sky-500 hover:bg-sky-600">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  </section>
  )
}