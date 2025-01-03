import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import authService from "@/services/auth";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
const SignupPage = () => {
  const navigate = useNavigate();
  const gender = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
    // { value: "Prefer not to say", label: "Prefer not to say" },
  ];
  const dispatch = useDispatch();
  const { register, handleSubmit, control } = useForm();
  const create = async (data) => {

   
    try {
      const createdUser = await authService.createUser(data);
      const userData = {
        _id: createdUser.data.loggedInUser._id,
        fullName: createdUser.data.loggedInUser.fullName,
        email: createdUser.data.loggedInUser.email,
      };
      console.log(userData);
      if (createdUser) {
        dispatch(login(userData));

        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);

    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit(create)}>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <Input
              id="name"
              name="name"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              {...register("fullName", { required: true })}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <Input
              type="email"
              id="email"
              name="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700"
            >
              Gender
            </label>
            <Controller
              name="gender"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full h-8">
                    <SelectValue placeholder="Select your Gender" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[160px] overflow-y-auto">
                    <SelectGroup>
                      {gender.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <Input
              type="password"
              id="password"
              name="password"
              {...register("password", { required: true })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
