import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-screen bg-[url('/hero-bg.jpeg')] bg-cover bg-center">
    <div className="absolute inset-0 bg-black/20" />
  
    <div className="container relative mx-auto px-4 pt-32">
      <div className="max-w-2xl space-y-8">
        <div className="space-y-4">
          <span className="text-sky-500 text-xl font-medium">01</span>
          <h1 className="text-5xl font-bold text-white">
            It's Time to Start Your
            <span className="block mt-2">Mountain & Hiking Adventures</span> 
          </h1>
          <p className="text-gray-200 text-lg">
            Embark on unforgettable journeys through breathtaking landscapes. Discover the thrill of mountain climbing and the serenity of scenic hikes. 
          </p>
        </div>
  
        <Link
          href="/join"
          className="inline-block bg-sky-500 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-sky-600 transition-colors"
        >
          Join Us Now
        </Link>
      </div>
  
      <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4">
        <Link href="#" className="text-white hover:text-sky-500 transition-colors">
          <Facebook className="w-6 h-6" />
        </Link>
        <Link href="#" className="text-white hover:text-sky-500 transition-colors">
          <Twitter className="w-6 h-6" />
        </Link>
        <Link href="#" className="text-white hover:text-sky-500 transition-colors">
          <Instagram className="w-6 h-6" />
        </Link>
      </div>
    </div>
  </section>
  )
}

