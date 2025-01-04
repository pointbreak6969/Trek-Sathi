import { Hero } from "./Hero";
import Services from "./Services";
import { Story } from "./Story";
import { Team } from "./Team";
import { Treks } from "./Treks";
const Home = () => {
  const services = [
    {
      title: "Hiking",
      description: "Explore hidden trails and breathtaking views. Our hiking programs take you through diverse landscapes, from lush forests to mountain peaks.",
      imageUrl: "/hiking.webp",
    },
    {
      title: "Camping",
      description: "Immerse yourself in nature and spend unforgettable nights under the stars. We provide all the necessary equipment for an unforgettable camping experience.",
      imageUrl: "/camping.jpg",
    },
    {
      title: "Trekking",
      description: "Embark on multi-day adventures, crossing remote valleys and scaling mountain passes. A unique experience for exploration enthusiasts.",
      imageUrl: "/trekking.jpg",
    },
    {
      title: "Mountaineering",
      description: "Challenge yourself and reach new heights. Our expert guides will accompany you on technical climbs of various mountain ranges.",
      imageUrl: "/mountaineering.jpg",
    },
    {
      title: "Bikepacking",
      description: "Combine your passion for cycling with a love for nature. Explore off-road trails with your bike and carry everything you need in specialized packs.",
      imageUrl: "/bikepacking.jpg", 
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
      description:
        "A challenging trek to the base of the world's highest peak, offering stunning views of the Himalayas.",
      difficulty: "Difficult",
      duration: "14 days",
    },
    {
      name: "Annapurna Circuit",
      imageUrl: "/trek-2.jpg",
      description:
        "A classic Himalayan trek that takes you through diverse landscapes, from lush valleys to alpine peaks.",
      difficulty: "Moderate",
      duration: "16 days",
    },
    {
      name: "Langtang Valley Trek",
      imageUrl: "/everest.jpg",
      description:
        "Trek through a beautiful valley with stunning views of the Langtang Himal.",
      difficulty: "Moderate",
      duration: "7-10 days",
    },
    {
      name: "Ghorepani Poon Hill Trek",
      imageUrl: "/manaslu.jpg",
      description:
        "A shorter trek offering incredible sunrise views over the Annapurna range.",
      difficulty: "Easy",
      duration: "5-7 days",
    },
    {
      name: "Manaslu Circuit Trek",
      imageUrl: "/trek-5.jpg",
      description:
        "A challenging trek around the Manaslu massif, offering stunning scenery and cultural experiences.",
      difficulty: "Challenging",
      duration: "14-21 days",
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
