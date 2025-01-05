import { Button } from "@/components/ui/button";

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
              Our <span className="text-[#6366f1]">Story</span>
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Here’s the story behind Trek-Sathi 🌄. When we planned our first trek, we were super excited, but the preparation turned out to be a real challenge 😅. We didn’t know what clothes to pack 🧥, which routes were best 🗺️, or where to find good places to stay 🏨 along the way.
              </p>
              <p>
                Our research took us through outdated websites and scattered advice in Facebook groups, and it felt like we were spending more time planning than actually enjoying the experience 🙄. That’s when we realized there had to be a better way 💡.
              </p>
              <p>
                So, we created Trek-Sathi 📱 — an app designed to simplify trekking for everyone. It provides everything from packing lists ✅, route guides 🛤️, hotel recommendations 🛏️, and the best time to trek ⏱️. With Trek-Sathi, we wanted to take the hassle out of planning so that trekking could be all about enjoying the journey 🌟.
              </p>
            </div>
            <Button size="lg" className="bg-[#6366f1] hover:bg-[#6366f1]/90">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
