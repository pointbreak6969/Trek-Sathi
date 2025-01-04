import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm, Controller } from "react-hook-form";
import { X, Instagram, Facebook, Twitter } from "lucide-react";
import authService from "@/services/auth";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const { register, handleSubmit, control } = useForm();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await authService.getUserData();
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const onSubmit = (data) => {
    console.log(data);
  };

  //   if (!userData) {
  //     return <div>Loading...</div>;
  //   }
  const socialInputs = [
    {
      name: "instagram",
      icon: Instagram,
      placeholder: "https://www.instagram.com/yourusername",
    },
    {
      name: "facebook",
      icon: Facebook,
      placeholder: "https://www.facebook.com/yourusername",
    },
    {
      name: "twitter",
      icon: Twitter,
      placeholder: "https://www.twitter.com/yourusername",
    },
  ];
  const popularTreks = [
    "Everest Base Camp",
    "Annapurna Circuit",
    "Langtang Valley",
    "Manaslu Circuit",
    "Gosaikunda Trek",
    "Mardi Himal",
    "Annapurna Base Camp",
  ];
  const [selectedTreks, setSelectedTreks] = useState([]);
  const handleAddTrek = (trek) => {
    if (trek && !selectedTreks.includes(trek)) {
      setSelectedTreks([...selectedTreks, trek]);
    }
  };

  const handleRemoveTrek = (trek) => {
    setSelectedTreks(selectedTreks.filter((t) => t !== trek));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
          Additional Details
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <Input
              type="text"
              id="fullname"
              name="fullname"
              //   defaultValue={userData.phone}
              readOnly
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              {...register("phone")}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <Input
              type="tel"
              id="phone"
              name="phone"
              //   defaultValue={userData.phone}
              readOnly
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              {...register("phone")}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Profile Image
            </label>
            <Input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              {...register("image")}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-700"
            >
              Age
            </label>
            <Input
              type="number"
              id="age"
              name="age"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              {...register("age")}
            />
          </div>

          <div className="space-y-6">
            <Label className="text-lg font-semibold">
              Social Media Links (optional)
            </Label>
            {socialInputs.map(({ name, icon: Icon, placeholder }) => (
              <div key={name} className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Icon className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="url"
                  id={name}
                  name={name}
                  placeholder={placeholder}
                  className="pl-10 w-full"
                  {...register(name)}
                />
              </div>
            ))}
          </div>
          <div className="mb-6">
            <label
              htmlFor="past_treks"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Past Treks (optional)
            </label>
            <Controller
              name="past_treks"
              control={control}
              render={({ field }) => (
                <div className="relative">
                  <Input
                    {...field}
                    list="treks"
                    placeholder="Type or select past treks..."
                    className="w-full pr-20"
                    onChange={(e) => {
                      field.onChange(e);
                      if (popularTreks.includes(e.target.value)) {
                        handleAddTrek(e.target.value);
                        e.target.value = "";
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      if (field.value) {
                        handleAddTrek(field.value);
                        field.onChange("");
                      }
                    }}
                    className="absolute right-0 top-0 h-full"
                  >
                    Add
                  </Button>
                  <datalist id="treks">
                    {popularTreks.map((trek) => (
                      <option key={trek} value={trek} />
                    ))}
                  </datalist>
                </div>
              )}
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {selectedTreks.map((trek) => (
                <div
                  key={trek}
                  className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center"
                >
                  {trek}
                  <button
                    type="button"
                    onClick={() => handleRemoveTrek(trek)}
                    className="ml-1.5 text-blue-600 hover:text-blue-800"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
