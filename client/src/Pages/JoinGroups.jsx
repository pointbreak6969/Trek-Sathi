import React, { useState } from "react";
import {
  Users,
  Calendar,
  Search,
  ChevronRight,
  PlusCircle,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const JoinGroups = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    difficulty: "",
    duration: "",
    groupType: "",
    age: "Any",
    gender: "Any",
  });

  const featuredGroups = [
    {
      id: 1,
      name: "EBC Adventure Group",
      destination: "Everest Base Camp",
      status: "Can Join",
      members: 6,
      maxMembers: 10,
      date: "Oct 15 - Oct 28",
      age: "any",
      gender: "Mixed",
    },
    {
      id: 2,
      name: "Annapurna Circuit Team",
      destination: "Annapurna Circuit",
      status: "Not Eligible",
      members: 4,
      maxMembers: 8,
      date: "Nov 1 - Nov 15",
      age: "25-35",
      gender: "Female",
    },
    {
      id: 3,
      name: "Langtang Valley Trek",
      destination: "Langtang Valley",
      status: "Full",
      members: 8,
      maxMembers: 8,
      date: "Oct 20 - Oct 27",
      age: "30-40",
      gender: "Female",
    },
    {
      id: 4,
      name: "Mardi Himal Trek",
      destination: "Mardi Himal",
      status: "Can Join",
      members: 5,
      maxMembers: 10,
      date: "Dec 10 - Dec 20",
      age: "20-30",
      gender: "Male",
    },
    {
      id: 5,
      name: "Manaslu Circuit Trek",
      destination: "Manaslu Circuit",
      status: "Can Join",
      members: 3,
      maxMembers: 8,
      date: "Jan 5 - Jan 20",
      age: "25-35",
      gender: "Mixed",
    },
    {
      id: 6,
      name: "Gosaikunda Lake Trek",
      destination: "Gosaikunda Lake",
      status: "Full",
      members: 8,
      maxMembers: 8,
      date: "Feb 1 - Feb 10",
      age: "any",
      gender: "Mixed",
    },
  ];
  const navigate = useNavigate();

  const filteredGroups = featuredGroups.filter((group) => {
    const matchesSearch = group.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesDifficulty =
      !filters.difficulty || group.difficulty === filters.difficulty;
    const matchesDuration =
      !filters.duration || group.duration === filters.duration;
    const matchesGroupType =
      !filters.groupType || group.groupType === filters.groupType;
    const matchesAge = filters.age === "Any" || group.age === filters.age;
    const matchesGender =
      filters.gender === "Any" || group.gender === filters.gender;

    return (
      matchesSearch &&
      matchesDifficulty &&
      matchesDuration &&
      matchesGroupType &&
      matchesAge &&
      matchesGender
    );
  });

  return (
    <div className="container mx-auto p-4 bg-gray-50">
      <div className="flex flex-col gap-4">
        <div className="my-6 flex justify-center">
          <Button
            variant="outline"
            className="flex items-center gap-2 text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
            onClick={() => navigate("/groupformation/mardi")}
          >
            <PlusCircle className="h-5 w-5" />
            Create Your Group
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            className="pl-10 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500"
            placeholder="Search treks, guides, or groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Select
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, difficulty: value }))
            }
          >
            <SelectTrigger className="w-[140px] border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent className="border border-gray-300 rounded-lg">
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="moderate">Moderate</SelectItem>
              <SelectItem value="difficult">Difficult</SelectItem>
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, duration: value }))
            }
          >
            <SelectTrigger className="w-[140px] border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500">
              <SelectValue placeholder="Duration" />
            </SelectTrigger>
            <SelectContent className="border border-gray-300 rounded-lg">
              <SelectItem value="1-3">1-3 days</SelectItem>
              <SelectItem value="4-7">4-7 days</SelectItem>
              <SelectItem value="8+">8+ days</SelectItem>
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, groupType: value }))
            }
          >
            <SelectTrigger className="w-[140px] border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500">
              <SelectValue placeholder="Group Type" />
            </SelectTrigger>
            <SelectContent className="border border-gray-300 rounded-lg">
              <SelectItem value="solo">Solo Joiners</SelectItem>
              <SelectItem value="small">Small Groups</SelectItem>
              <SelectItem value="custom">Custom Group</SelectItem>
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, age: value }))
            }
          >
            <SelectTrigger className="w-[140px] border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500">
              <SelectValue placeholder="Age" />
            </SelectTrigger>
            <SelectContent className="border border-gray-300 rounded-lg">
              <SelectItem value="Any">Any</SelectItem>
              <SelectItem value="20-30">20-30</SelectItem>
              <SelectItem value="25-35">25-35</SelectItem>
              <SelectItem value="30-40">30-40</SelectItem>
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, gender: value }))
            }
          >
            <SelectTrigger className="w-[140px] border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500">
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent className="border border-gray-300 rounded-lg">
              <SelectItem value="Any">Any</SelectItem>
              <SelectItem value="Mixed">Mixed</SelectItem>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Featured Groups Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">
            Featured Groups
          </h2>
          <Button
            variant="ghost"
            className="text-sm text-gray-500 hover:text-blue-500"
            onClick={() => navigate("/groups")}
          >
            View all <ChevronRight className="h-5 w-5 ml-1" />
          </Button>
        </div>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredGroups.map((group) => (
            <Card
              key={group.id}
              className="cursor-pointer hover:shadow-lg transition-shadow border border-gray-300 rounded-lg"
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg text-gray-700">
                      {group.name}
                    </CardTitle>
                    <p className="text-sm text-gray-500">{group.destination}</p>
                  </div>
                  <Badge
                    variant={
                      group.status === "Can Join" ? "success" : "secondary"
                    }
                    className={`${
                      group.status === "Can Join"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    } rounded-lg px-2 py-1`}
                  >
                    {group.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Users className="h-5 w-5" />
                    <span>
                      {group.members}/{group.maxMembers} members
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="h-5 w-5" />
                    <span>{group.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>Age: {group.age}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>Gender: {group.gender}</span>
                  </div>
                  {group.status === "Can Join" && (
                    <Button
                      variant="success"
                      size="sm"
                      className="bg-blue-500 text-white hover:bg-blue-700"
                      onClick={() => navigate(`/groupchat`)}
                    >
                      Join Group
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default JoinGroups;
