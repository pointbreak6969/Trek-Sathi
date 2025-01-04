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
        "Explore hidden trails and breathtaking views. Our hiking programs take you through diverse landscapes, from lush forests to mountain peaks.",
      imageUrl: "/hiking.webp",
    },
    {
      title: "Camping",
      description:
        "Immerse yourself in nature and spend unforgettable nights under the stars. We provide all the necessary equipment for an unforgettable camping experience.",
      imageUrl: "/camping.jpg",
    },
    {
      title: "Trekking",
      description:
        "Embark on multi-day adventures, crossing remote valleys and scaling mountain passes. A unique experience for exploration enthusiasts.",
      imageUrl: "/trekking.jpg",
    },
    {
      title: "Mountaineering",
      description:
        "Challenge yourself and reach new heights. Our expert guides will accompany you on technical climbs of various mountain ranges.",
      imageUrl: "/mountaineering.jpg",
    },
    {
      title: "Bikepacking",
      description:
        "Combine your passion for cycling with a love for nature. Explore off-road trails with your bike and carry everything you need in specialized packs.",
      imageUrl: "/bikepacking.jpg",
    },
  ];
  const teamMembers = [
    {
      name: "Pasang Sherpa",
      role: "Head Guide & Everest Summiteer",
      imageUrl:
        "https://web.nepalnews.com/storage/story/1024/243679776_4750159305017445_4443386502151722461_n1653043887_1024.jpg",
      socialLinks: {
        facebook: "https://facebook.com/pasangsherpa",
        twitter: "https://twitter.com/pasangsherpa",
        instagram: "https://instagram.com/pasangsherpa",
      },
    },
    {
      name: "Ang Dorje",
      role: "Senior Guide & Local Expert",
      imageUrl: "/team-2.jpg",
      socialLinks: {
        facebook: "https://facebook.com/angdorje",
        twitter: "https://twitter.com/angdorje",
        instagram: "https://instagram.com/angdorje",
      },
    },
    {
      name: "Dawa Yangzong",
      role: "Wilderness Guide & Eco-Tourism Advocate",
      imageUrl: "/team-1.jpg",
      socialLinks: {
        facebook: "https://facebook.com/dawayangzong",
        twitter: "https://twitter.com/dawayangzong",
        instagram: "https://instagram.com/dawayangzong",
      },
    },
    {
      name: "Tashi Lakpa",
      role: "Climbing Instructor & Cultural Ambassador",
      imageUrl:
        "https://www.nepaltrekkinginhimalaya.com/images/articles/eSQDU-1ca6c064-ee9f-4abd-b5fb-3eced5455ecb.jpeg",
      socialLinks: {
        facebook: "https://facebook.com/tashilakpa",
        twitter: "https://twitter.com/tashilakpa",
        instagram: "https://instagram.com/tashilakpa",
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
