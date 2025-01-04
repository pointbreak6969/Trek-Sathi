import { Facebook, Twitter, Instagram } from 'lucide-react'




export function Team({ members }) {
  return (
<section className="py-24 bg-white">
  <div className="container mx-auto px-4">
    <div className="text-center max-w-3xl mx-auto mb-16">
      <h2 className="text-4xl font-bold mb-4">
        Meet Our <span className="text-sky-500">Expert Guides</span>
      </h2>
      <p className="text-gray-600">
        Our team of passionate and experienced guides are here to make your adventure unforgettable. 
        They have a deep knowledge of the outdoors and are committed to your safety and enjoyment.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {members.map((member, index) => (
        <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="aspect-square relative">
            <img
              src={member.imageUrl}
              alt={member.name}
              fill
              className="object-cover h-full"
            />
          </div>
          <div className="p-6 text-center">
            <h3 className="text-xl font-bold mb-1">{member.name}</h3>
            <p className="text-gray-600 mb-4">{member.role}</p>
            <div className="flex justify-center gap-4">
              {member.socialLinks.facebook && (
                <a href={member.socialLinks.facebook} className="text-gray-400 hover:text-sky-500">
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {member.socialLinks.twitter && (
                <a href={member.socialLinks.twitter} className="text-gray-400 hover:text-sky-500">
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {member.socialLinks.instagram && (
                <a href={member.socialLinks.instagram} className="text-gray-400 hover:text-sky-500">
                  <Instagram className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
  )
}

