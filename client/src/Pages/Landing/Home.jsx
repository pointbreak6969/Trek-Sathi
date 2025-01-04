import { Hero } from "./Hero";
import Services from "./Services";
import { Story } from "./Story";
import { Team } from "./Team";
import { Treks } from "./Treks";
const Home = () => {
  const services = [
    {
      title: "Hiking",
      description:
        "Lorem ipsum dolor sit amet, conse ipsum dolor sit magna aliqua.",
      imageUrl: "/hiking.webp",
    },
    {
      title: "Camping",
      description:
        "Lorem ipsum dolor sit amet, conse ipsum dolor sit magna aliqua.",
      imageUrl: "/camping.jpg",
    },
    {
      title: "Trekking",
      description:
        "Lorem ipsum dolor sit amet, conse ipsum dolor sit magna aliqua.",
      imageUrl: "/trekking.jpg",
    },
    {
      title: "Mountaineering",
      description:
        "Lorem ipsum dolor sit amet, conse ipsum dolor sit magna aliqua.",
      imageUrl: "/mountaineering.jpg",
    },
    {
      title: "Hiking",
      description:
        "Lorem ipsum dolor sit amet, conse ipsum dolor sit magna aliqua.",
      imageUrl: "/hiking.webp",
    },
  ];
  const teamMembers = [
    {
      name: "Emily Carter",
      role: "Lead Mountain Guide",
      imageUrl: "/team-1.jpg",
      socialLinks: {
        facebook: "https://facebook.com/emilycarter",
        twitter: "https://twitter.com/emilycarter",
        instagram: "https://instagram.com/emilycarter",
      },
    },
    {
      name: "Liam Johnson",
      role: "Expedition Planner",
      imageUrl: "/team-2.jpg",
      socialLinks: {
        facebook: "https://facebook.com/liamjohnson",
        twitter: "https://twitter.com/liamjohnson",
        instagram: "https://instagram.com/liamjohnson",
      },
    },
    {
      name: "Sophia Martinez",
      role: "Wilderness Survival Expert",
      imageUrl: "/team-3.webp",
      socialLinks: {
        facebook: "https://facebook.com/sophiamartinez",
        twitter: "https://twitter.com/sophiamartinez",
        instagram: "https://instagram.com/sophiamartinez",
      },
    },
    {
      name: "Ethan Walker",
      role: " Climbing Specialist",
      imageUrl: "/team-4.webp",
      socialLinks: {
        facebook: "https://facebook.com/ethanwalker",
        twitter: "https://twitter.com/ethanwalker",
        instagram: "https://instagram.com/ethanwalker",
      },
    },
  ];
  
  const trekLocations = [
    {
      name: "Everest Base Camp",
      imageUrl: "/trek-1.webp",
      description: "A challenging trek to the base of the world's highest peak, offering stunning views of the Himalayas.",
      difficulty: "Difficult",
      duration: "14 days",
    },
    {
      name: "Annapurna Circuit",
      imageUrl: "/trek-2.jpg",
      description: "A classic Himalayan trek that takes you through diverse landscapes, from lush valleys to alpine peaks.",
      difficulty: "Moderate",
      duration: "16 days",
    },
    {
      name: "Sahara Desert Trek",
      imageUrl: "/trek-3.jpg",
      description: "An unforgettable journey across the golden sands of the Sahara, exploring oases and desert culture.",
      difficulty: "Moderate",
      duration: "7 days",
    },
    {
      name: "Inca Trail to Machu Picchu",
      imageUrl: "/trek-4.jpg",
      description: "Follow ancient pathways through the Andes to the iconic ruins of Machu Picchu.",
      difficulty: "Moderate",
      duration: "4 days",
    },
    {
      name: "Kilimanjaro Trek",
      imageUrl: "/trek-5.jpg",
      description: "Climb Africa's highest peak, experiencing diverse ecosystems on your way to the summit.",
      difficulty: "Difficult",
      duration: "7-9 days",
    },
  ];
  

  return (
    <div className="bg-[#6366f1]">
      <Hero />
      <Services services={services} />
      <Story />
      <Team members={teamMembers} />
      <Treks locations={trekLocations} />
    </div>
  );
};
export default Home;
