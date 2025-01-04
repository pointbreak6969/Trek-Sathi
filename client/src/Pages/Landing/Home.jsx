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
      name: "Team Member 1",
      role: "Professional Hiker",
      imageUrl: "/team-1.jpg",
      socialLinks: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
      },
    },
    {
      name: "Team Member 2",
      role: "Professional Hiker",
      imageUrl: "/team-2.jpg",
      socialLinks: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
      },
    },
    {
      name: "Team Member 3",
      role: "Professional Hiker",
      imageUrl: "/team-3.jpg",
      socialLinks: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
      },
    },
    {
      name: "Team Member 4",
      role: "Professional Hiker",
      imageUrl: "/team-4.jpg",
      socialLinks: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
      },
    },
  ];
  const trekLocations = [
    {
      name: "Mountain Trek 1",
      imageUrl: "/trek-1.jpg",
    },
    {
      name: "Mountain Trek 2",
      imageUrl: "/trek-2.jpg",
    },
    {
      name: "Sandy Mountain",
      imageUrl: "/trek-3.jpg",
    },
    {
      name: "Mountain Trek 4",
      imageUrl: "/trek-4.jpg",
    },
    {
      name: "Mountain Trek 5",
      imageUrl: "/trek-5.jpg",
    },
  ];

  return (
    <>
      <Hero />
      <Services services={services} />
      <Story />
      <Team members={teamMembers} />
      <Treks locations={trekLocations} />
    </>
  );
};
export default Home;
