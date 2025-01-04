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
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece
                of classical Latin literature from 45 BC, making it over 2000 years old.
              </p>
              <p>
                Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one
                of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through
                the cites of the word in classical literature, discovered the undoubtable source.
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