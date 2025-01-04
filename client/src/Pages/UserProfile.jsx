import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm, Controller } from "react-hook-form";
import { X, Instagram, Facebook, Twitter, Camera } from "lucide-react";
import axios from "axios";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const { register, handleSubmit, control } = useForm();
  const [profileImage, setProfileImage] = useState(null);
  const [selectedTreks, setSelectedTreks] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/me`,
          {
            withCredentials: true,
          }
        );
        setUserData(response.data.data);
        if (response.data.data?.profileImage) {
          setPreviewUrl(response.data.data.profileImage);
        }
        setError(null);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load user data. Please try again later.");
      }
    };

    fetchUserData();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };

  useEffect(() => {
    return () => {
      if (
        previewUrl &&
        !previewUrl.startsWith("data:") &&
        !previewUrl.startsWith("http")
      ) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      // Append all form fields
      Object.keys(data).forEach((key) => {
        if (key === "image" && profileImage) {
          formData.append("image", profileImage);
        } else if (key !== "image") {
          formData.append(key, data[key]);
        }
      });

      // Append selected treks
      formData.append("past_treks", JSON.stringify(selectedTreks));

      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/user/profile`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        // Handle success (e.g., show success message, redirect, etc.)
        console.log("Profile updated successfully");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile. Please try again later.");
    }
  };

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
        {/* Image Upload Section */}
        <div className="text-center relative">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
          ) : (
            <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-gray-200 flex items-center justify-center">
              <Camera className="w-8 h-8 text-gray-400" />
            </div>
          )}
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
            {...register("image")}
          />
          <label
            htmlFor="image"
            className="cursor-pointer absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
          >
            <Camera className="w-5 h-5 text-gray-600" />
          </label>
        </div>

        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
          Additional Details
        </h2>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 border border-red-300 rounded-md">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <div>
            <Label htmlFor="fullname">Name</Label>
            <Input
              type="text"
              id="fullname"
              readOnly
              className="mt-1"
              placeholder={userData?.fullName || "Your full name"}
              {...register("fullname")}
            />
          </div>

          {/* Phone Field */}
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              type="tel"
              id="phone"
              readOnly
              className="mt-1"
              placeholder="9862383881"
              {...register("phone")}
            />
          </div>

          {/* Age Field */}
          <div>
            <Label htmlFor="age">Age</Label>
            <Input
              type="number"
              id="age"
              required
              className="mt-1"
              placeholder="25"
              {...register("age", { required: true, min: 0 })}
            />
          </div>

          {/* Social Media Section */}
          <div className="space-y-4">
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
                  placeholder={placeholder}
                  className="pl-10"
                  {...register(name)}
                />
              </div>
            ))}
          </div>

          {/* Past Treks Section */}
          <div>
            <Label htmlFor="past_treks" className="text-md font-semibold">
              Past Treks (optional)
            </Label>
            <Controller
              name="past_treks"
              control={control}
              render={({ field }) => (
                <div className="relative mt-3">
                  <Input
                    {...field}
                    list="treks"
                    placeholder="Type or select past treks..."
                    className="pr-20"
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

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
